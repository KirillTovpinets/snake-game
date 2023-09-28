import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initGame } from '../features/game'

export const useStartGame = () => {
  const dispatch = useDispatch()
  const handleStartGame = () => {
    dispatch(initGame())
  }

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.code !== 'Enter') {
        return
      }
      handleStartGame()
    }
    window.document.addEventListener('keydown', handler)

    return () => window.document.removeEventListener('keydown', handler)
  }, [])

  return { handleStartGame }
}
