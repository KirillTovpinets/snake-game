import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { getRandormCoordinates } from '../helpers'
import { CellConfig, Game, Position } from '../interfaces'
import { KeyboardCodes } from '../types'
const initialState: Game = {
  cells: [],
  apple: { x: 0, y: 0 },
  snake: null,
  fieldSize: [0, 0],
  snakeDirection: null,
}

const nextActiveCell = (
  state: Game,
  comparator: (cell: CellConfig) => boolean
) => {
  const { apple, cells } = state
  const nextCell = cells.find(comparator)

  if (!nextCell || nextCell.id === state.snake?.next?.id) {
    return state.snake
  }
  const temp = state.snake
  if (nextCell?.x === apple.x && nextCell?.y === apple.y) {
    const [height, width] = state.fieldSize

    const newAppleCoordinates = getRandormCoordinates(height, width)
    state.apple = newAppleCoordinates

    return { ...nextCell, next: temp }
  }

  let pointer = temp
  while (pointer && pointer.next !== null && pointer.next.next !== null) {
    pointer = pointer.next
  }

  if (pointer !== null && pointer.next !== null) {
    pointer.next = null
    return { ...nextCell, next: temp }
  }

  return nextCell
}
const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setFieldConfig(state: Game, action: PayloadAction<CellConfig[]>) {
      state.cells = action.payload
    },
    initilizeSnake(state: Game, action: PayloadAction<CellConfig | undefined>) {
      state.snake = action.payload!
    },
    setApplePosition(state: Game, action: PayloadAction<Position>) {
      state.apple = action.payload
    },
    setFieldSize(state: Game, action: PayloadAction<[number, number]>) {
      state.fieldSize = action.payload
    },
    moveSnake(state: Game, action: PayloadAction<KeyboardCodes>) {
      if (!state.snake) {
        return state
      }

      const { x, y } = state.snake

      if (
        (action.payload === KeyboardCodes.down &&
          state.snakeDirection === KeyboardCodes.up) ||
        (action.payload === KeyboardCodes.left &&
          state.snakeDirection === KeyboardCodes.right) ||
        (action.payload === KeyboardCodes.up &&
          state.snakeDirection === KeyboardCodes.down) ||
        (action.payload === KeyboardCodes.right &&
          state.snakeDirection === KeyboardCodes.left)
      ) {
        return
      }

      state.snakeDirection = action.payload
      switch (action.payload) {
        case KeyboardCodes.right:
          state.snake = nextActiveCell(
            state,
            (cell) => cell.x === x + 1 && cell.y === y
          )
          break
        case KeyboardCodes.left:
          state.snake = nextActiveCell(
            state,
            (cell) => cell.x === x - 1 && cell.y === y
          )
          break

        case KeyboardCodes.up:
          state.snake = nextActiveCell(
            state,
            (cell) => cell.x === x && cell.y === y - 1
          )
          break

        case KeyboardCodes.down:
          state.snake = nextActiveCell(
            state,
            (cell) => cell.x === x && cell.y === y + 1
          )
          break

        default:
          break
      }
    },
  },
})

export const {
  setFieldConfig,
  initilizeSnake,
  moveSnake,
  setApplePosition,
  setFieldSize,
} = gameSlice.actions
export default gameSlice.reducer
