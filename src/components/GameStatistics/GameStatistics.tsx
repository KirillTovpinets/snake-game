import dayjs from 'dayjs'
import React from 'react'
import { useSelector } from 'react-redux'
import { useStartGame } from '../../hooks/useStartGame'
import { RootState } from '../../store'
import { Button } from '../layout/Button'
import { Modal } from '../layout/Modal'
import { Pannel } from '../layout/Pannel'
import { Row } from '../layout/Row'
export const GameStatistics = () => {
  const { speedLevel, snakeSize, gameEnded, gameStarted } = useSelector(
    (state: RootState) => state.game.statistics
  )
  const { handleStartGame } = useStartGame()
  const durationInSeconds =
    dayjs(gameEnded).diff(dayjs(gameStarted), 'second') || 0
  const durationInMinutes =
    dayjs(gameEnded).diff(dayjs(gameStarted), 'minute') || 0
  return (
    <Modal>
      <Pannel>
        <Row
          title="Duration in minutes"
          value={`${durationInMinutes}:${durationInSeconds % 60}`}
        />
        <Row title="Max speed level" value={speedLevel} />
        <Row title="Snake size" value={snakeSize} />
        <Button onClick={handleStartGame}>Play again</Button>
      </Pannel>
    </Modal>
  )
}
