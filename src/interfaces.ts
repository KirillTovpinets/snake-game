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

export interface GameStatistics {
  snakeSize: number
  speedLevel: number
  gameStarted: string | null
  gameEnded: string | null
}
export interface Game {
  apple: Position
  cells: CellConfig[]
  fieldSize: [number, number]
  snake: CellConfig | null
  snakeDirection: KeyboardCodes | null
  statistics: GameStatistics
  speed: number
  timerId: any | null
  isStarted: boolean
  isGameOver: boolean
  isInProgress: boolean
}

export interface UpdatedSnakeData {
  head: CellConfig
  appleCoordinates?: Position | null
  isSnakeIncremented: boolean
}
export interface FieldConfig {
  size: [number, number]
  cells: CellConfig[]
}
