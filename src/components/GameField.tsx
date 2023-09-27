import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useAppConfig } from '../hooks/useAppConfig'
import { CellConfig } from '../interfaces'
import { RootState } from '../store'
import FieldCell from './FieldCell/FieldCell'
import './GameField.css'

export const GameField: React.FC = () => {
  const fieldRef = useRef(null)
  useAppConfig(fieldRef)

  const cells = useSelector((state: RootState) => state.game.cells)

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
