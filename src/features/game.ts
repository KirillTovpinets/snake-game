import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import {
  INITIAL_SPEED_IN_MILISECONDS,
  SPEED_MINIMUM_IN_MILISECONDS,
  SPEED_STEP_IN_MILISECONDS,
  TESTING_SPEED_IN_MILISECONDS,
} from '../constants'
import {
  getRandormCoordinates,
  getUpdateSnakeHead,
  nextActiveCell,
} from '../helpers'
import { CellConfig, FieldConfig, Game } from '../interfaces'
import { KeyboardCodes } from '../types'
const initialState: Game = {
  apple: { x: 0, y: 0 },
  cells: [],
  isInProgress: false,
  snake: null,
  fieldSize: [0, 0],
  snakeDirection: KeyboardCodes.down,
  timerId: null,
  speed: INITIAL_SPEED_IN_MILISECONDS,
  snakeSize: 1,
  isStarted: false,
}

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setFieldConfig(state: Game, action: PayloadAction<FieldConfig>) {
      state.cells = action.payload.cells
      state.fieldSize = action.payload.size
    },
    initGame(state: Game) {
      const [numRows, numCols] = state.fieldSize
      const appleCoordinates = getRandormCoordinates(numRows - 1, numCols - 1)
      const startY = Math.floor(numRows / 2)
      const startX = Math.floor(numCols / 2)

      state.speed = process.env.NODE_ENV === 'production' ? INITIAL_SPEED_IN_MILISECONDS : TESTING_SPEED_IN_MILISECONDS

      const startCell = state.cells.find(
        (cell) => cell.x === startX && cell.y === startY
      )
      state.snake = startCell || null
      state.isStarted = true
      state.apple = appleCoordinates
    },
    setTimerId(state: Game, action: PayloadAction<any>) {
      state.timerId = action.payload
    },
    setSnakeDirection(state: Game, action: PayloadAction<KeyboardCodes>) {
      state.isInProgress = true
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
    },
    moveSnake(state: Game) {
      if (!state.snake) {
        return state
      }

      const { x, y } = state.snake

      let nextCell: CellConfig | null = null

      switch (state.snakeDirection) {
        case KeyboardCodes.right:
          nextCell = nextActiveCell(state, x + 1, y)
          break
        case KeyboardCodes.left:
          nextCell = nextActiveCell(state, x - 1, y)
          break

        case KeyboardCodes.up:
          nextCell = nextActiveCell(state, x, y - 1)
          break

        case KeyboardCodes.down:
          nextCell = nextActiveCell(state, x, y + 1)
          break
        default:
          nextCell = nextActiveCell(state, x, y)
      }
      if (nextCell === null) {
        state.isInProgress = false;
        clearInterval(state.timerId)
        return {
          ...initialState,
          fieldSize: state.fieldSize,
          cells: state.cells,
          snake: state.snake,
        }
      } else {
        const updatedData = getUpdateSnakeHead(state, nextCell!)
        state.snake = updatedData.head
        state.snakeSize = updatedData.isSnakeIncremented
          ? state.snakeSize + 1
          : state.snakeSize
        state.apple = updatedData.appleCoordinates
          ? updatedData.appleCoordinates
          : state.apple

        if (updatedData.appleCoordinates) {
          const speed = state.speed - SPEED_STEP_IN_MILISECONDS
          state.speed =
            speed > SPEED_MINIMUM_IN_MILISECONDS
              ? speed
              : SPEED_MINIMUM_IN_MILISECONDS
        }
      }
      state.isInProgress = false
    },
  },
})

export const {
  setFieldConfig,
  moveSnake,
  initGame,
  setTimerId,
  setSnakeDirection,
} = gameSlice.actions
export default gameSlice.reducer
