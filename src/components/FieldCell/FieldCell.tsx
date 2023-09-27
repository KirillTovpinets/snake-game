import React from 'react'
import { useSelector } from 'react-redux'
import { CellConfig } from '../../interfaces'
import { RootState } from '../../store'
import './FieldCell.css'
interface Props {
  width: number
  height: number
  id: string
  x: number
  y: number
}
const FieldCell = ({ height, width, id, x, y }: Props) => {
  const cellConfig = useSelector(({ game }: RootState) => {
    const { snake } = game
    if (!snake) {
      return null
    }
    let pointer: CellConfig | null = snake
    while (pointer !== null && pointer.id !== id) {
      pointer = pointer.next
    }

    return pointer
  })

  const isApple = useSelector(({ game }: RootState) => {
    const { apple } = game
    return apple.x === x && apple.y === y
  })

  return (
    <div
      className={`snake-cell ${cellConfig !== null ? 'active' : ''} ${
        isApple ? 'is-apple' : ''
      }`}
      style={{ width: `${width}px`, height: `${height}px` }}
    ></div>
  )
}

export default React.memo(FieldCell)
