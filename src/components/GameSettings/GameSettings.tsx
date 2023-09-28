import { useStartGame } from '../../hooks/useStartGame'
import { Button } from '../layout/Button'
import { Modal } from '../layout/Modal'
import { Pannel } from '../layout/Pannel'
import './GameSettings.css'
export const GameSettings = () => {
  const { handleStartGame } = useStartGame()
  return (
    <Modal>
      <Pannel>
        <h3 className="snake-start-title">Do you want to start the game?</h3>
        <Button onClick={handleStartGame}>Start</Button>
      </Pannel>
    </Modal>
  )
}
