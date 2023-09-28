import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GameField } from './components/GameField'
import { GameSettings } from './components/GameSettings/GameSettings'
import { setSnakeDirection } from './features/game'
import { RootState } from './store'
import { KeyboardCodes } from './types'

const App: React.FC = () => {
  const dispatch = useDispatch()
  const timerId = useSelector((state: RootState) => state.game.timerId)
  useEffect(() => {
    const keydownHanlder = (event: KeyboardEvent) => {
      dispatch(setSnakeDirection(event.code as KeyboardCodes))
    }
    window.document.addEventListener('keydown', keydownHanlder)

    return () => window.document.removeEventListener('keydown', keydownHanlder)
  }, [])

  return (
    <div>
      <GameField />
      {!timerId && <GameSettings />}
    </div>
  )
}

export default App
