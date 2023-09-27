import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GameField } from './components/GameField'
import { moveSnake } from './features/game'
import { KeyboardCodes } from './types'

const App: React.FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    window.document.addEventListener('keydown', (event: KeyboardEvent) => {
      dispatch(moveSnake(event.code as KeyboardCodes))
    })
  }, [])
  return <GameField></GameField>
}

export default App
