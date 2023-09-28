import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { moveSnake, setTimerId } from '../features/game'
import { useAppConfig } from '../hooks/useAppConfig'
import { CellConfig } from '../interfaces'
import { RootState } from '../store'
import FieldCell from './FieldCell/FieldCell'
import './GameField.css'

export const GameField: React.FC = () => {
  const fieldRef = useRef(null)
  useAppConfig(fieldRef)

  const cells = useSelector((state: RootState) => state.game.cells)
  const speed = useSelector((state: RootState) => state.game.speed)
  const timer = useSelector((state: RootState) => state.game.timerId)
  const isStarted = useSelector((state: RootState) => state.game.isStarted)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!isStarted) {
      return
    }
    clearInterval(timer)
    const timerId = setInterval(() => {
      dispatch(moveSnake())
    }, speed)
    dispatch(setTimerId(timerId))
  }, [speed, isStarted])

  return (
    <div className="sname-game-field" ref={fieldRef}>
      {cells.map((cell: CellConfig) => (
        <FieldCell
          key={cell.id}
          width={cell.width}
          height={cell.height}
          id={cell.id}
          x={cell.x}
          y={cell.y}
        />
      ))}
    </div>
  )
}
