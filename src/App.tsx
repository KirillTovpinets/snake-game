import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GameField } from './components/GameField'
import { GameSettings } from './components/GameSettings/GameSettings'
import { setSnakeDirection } from './features/game'
import { RootState } from './store'
import { KeyboardCodes } from './types'
import { DIRECTIONS } from './constants'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const timerId = useSelector((state: RootState) => state.game.timerId)
  const isInProgress = useSelector((state: RootState) => state.game.isInProgress);

  useEffect(() => {
    const keydownHanlder = (event: KeyboardEvent) => {
      if(isInProgress || !DIRECTIONS.includes(event.code as KeyboardCodes)){
        return;
      }
      dispatch(setSnakeDirection(event.code as KeyboardCodes))
    }
    window.document.addEventListener('keydown', keydownHanlder)

    let startX: number;
    let startY: number;
    document.addEventListener('touchstart', (event: TouchEvent) => {
      const touch = event.changedTouches[0];

      startX = touch.pageX;
      startY = touch.pageY;
    })

    document.addEventListener('touchend', (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      const deltaX = touch.pageX - startX;
      const deltaY = touch.pageY - startY;
      if( deltaX> 0) {
        dispatch(setSnakeDirection(KeyboardCodes.right))
      } else if(touch.pageX - startX < 0) {
        dispatch(setSnakeDirection(KeyboardCodes.left))
      } else if(touch.pageY - startY < 0) {
        dispatch(setSnakeDirection(KeyboardCodes.up))
      } else if(touch.pageY - startY > 0) {
        dispatch(setSnakeDirection(KeyboardCodes.down))
      }
    })

    return () => window.document.removeEventListener('keydown', keydownHanlder)
  }, [isInProgress])

  return (
    <div>
      <GameField />
      {!timerId && <GameSettings />}
    </div>
  )
}

export default App
