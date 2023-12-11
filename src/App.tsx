import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GameField } from './components/GameField'
import { GameSettings } from './components/GameSettings/GameSettings'
import { GameStatistics } from './components/GameStatistics/GameStatistics'
import { DIRECTIONS, MAX_DELTA_FRACTION } from './constants'
import { setSnakeDirection } from './features/game'
import { RootState } from './store'
import { KeyboardCodes } from './types'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const timerId = useSelector((state: RootState) => state.game.timerId)
  const isGameOver = useSelector((state: RootState) => state.game.isGameOver)
  const isInProgress = useSelector(
    (state: RootState) => state.game.isInProgress
  )

  useEffect(() => {
    const keydownHanlder = (event: KeyboardEvent) => {
      if (isInProgress || !DIRECTIONS.includes(event.code as KeyboardCodes)) {
        return
      }
      dispatch(setSnakeDirection(event.code as KeyboardCodes))
    }
    window.document.addEventListener('keydown', keydownHanlder)

    let startX: number
    let startY: number
    document.addEventListener('touchstart', (event: TouchEvent) => {
      const touch = event.changedTouches[0]

      startX = touch?.pageX || 0
      startY = touch?.pageY || 0
    })

    document.addEventListener('touchend', (event: TouchEvent) => {
      const touch = event.changedTouches[0]
      const deltaX = touch?.pageX || 0 - startX
      const deltaY = touch?.pageY || 0 - startY
      const isXFractionOk = Math.abs(deltaX) < MAX_DELTA_FRACTION
      const isYFractionOk = Math.abs(deltaY) < MAX_DELTA_FRACTION
      if (deltaX > 0 && !isXFractionOk) {
        dispatch(setSnakeDirection(KeyboardCodes.right))
      } else if (deltaX < 0 && !isXFractionOk) {
        dispatch(setSnakeDirection(KeyboardCodes.left))
      } else if (deltaY < 0 && !isYFractionOk) {
        dispatch(setSnakeDirection(KeyboardCodes.up))
      } else if (deltaY > 0 && !isYFractionOk) {
        dispatch(setSnakeDirection(KeyboardCodes.down))
      }
    })

    return () => window.document.removeEventListener('keydown', keydownHanlder)
  }, [isInProgress])

  return (
    <div>
      <GameField />
      {!timerId && !isGameOver && <GameSettings />}
      {isGameOver && <GameStatistics />}
    </div>
  )
}

export default App
