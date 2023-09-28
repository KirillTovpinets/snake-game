import { useDispatch } from 'react-redux'
import { initGame } from '../../features/game'
import './GameSettings.css'
import { useEffect } from 'react'
export const GameSettings = () => {
  const dispatch = useDispatch()
  const handleStartGame = () => {
    dispatch(initGame())
  }

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if(event.code !== 'Enter') {
        return;
      } 
      handleStartGame();
    };
    window.document.addEventListener('keydown', handler)

    return () => window.document.removeEventListener('keydown', handler)
  }, [])
  return (
    <div className="snake-start-window">
      <div className="snake-start-pannel">
        <h3 className="snake-start-title">Do you want to start the game?</h3>
        <button className="snake-start-button" onClick={handleStartGame}>
          Start
        </button>
      </div>
    </div>
  )
}
