import { KeyboardCodes } from './types'

export interface Position {
  x: number
  y: number
}
export interface CellConfig extends Position {
  id: string
  width: number
  height: number
  next: CellConfig | null
}
export interface Game {
  cells: CellConfig[]
  apple: Position
  snake: CellConfig | null
  fieldSize: [number, number]
  snakeDirection: KeyboardCodes | null
}
