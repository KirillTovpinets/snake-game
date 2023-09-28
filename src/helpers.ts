import { CellConfig, Game, Position, UpdatedSnakeData } from './interfaces'

export const getRandormCoordinates = (
  rowsCount: number,
  colCount: number
): Position => {
  const randomX = Math.floor(Math.random() * (colCount + 1))
  const randomY = Math.floor(Math.random() * (rowsCount + 1))
  return { x: randomX, y: randomY }
}

export const nextActiveCell = (
  state: Game,
  targetX: number,
  targetY: number
): CellConfig | null => {
  const {
    cells,
    fieldSize: [row, col],
  } = state
  const comparator = (x: number, y: number) => (cell: CellConfig) =>
    cell.x === x && cell.y === y
  let nextCell = cells.find(comparator(targetX, targetY))

  if (!nextCell) {
    if (targetX < 0) {
      nextCell = cells.find(comparator(col - 1, targetY))
    } else if (targetX === col) {
      nextCell = cells.find(comparator(0, targetY))
    } else if (targetY < 0) {
      nextCell = cells.find(comparator(targetX, row - 1))
    } else if (targetY === row) {
      nextCell = cells.find(comparator(targetX, 0))
    }
  }
  
  let pointer = state.snake;

  while(pointer !== null) {
    if(!nextCell || nextCell.id === pointer.id) {
      debugger
      return null
    }
    pointer = pointer.next
  }
  return nextCell || null
}

export const getUpdateSnakeHead = (
  state: Game,
  nextCell: CellConfig
): UpdatedSnakeData => {
  const temp = state.snake
  if (nextCell?.x === state.apple.x && nextCell?.y === state.apple.y) {
    const [height, width] = state.fieldSize
    let newAppleCoordinates
    let isAccepted = false
    do {
      newAppleCoordinates = getRandormCoordinates(height - 1, width - 1)
      let pointer = state.snake

      const isOk = []
      while (pointer !== null) {
        isOk.push(
          pointer.x !== newAppleCoordinates.x ||
            pointer.y !== newAppleCoordinates.y
        )
        pointer = pointer.next
      }

      isAccepted = isOk.every((ok) => ok)
    } while (!isAccepted)
    return {
      head: { ...nextCell, next: temp },
      appleCoordinates: newAppleCoordinates,
      isSnakeIncremented: true,
    }
  }

  let pointer = temp
  while (pointer && pointer.next !== null && pointer.next.next !== null) {
    pointer = pointer.next
  }

  if (pointer !== null && pointer.next !== null) {
    pointer.next = null
    return {
      head: { ...nextCell, next: temp },
      isSnakeIncremented: false,
    }
  }

  return {
    head: nextCell,
    isSnakeIncremented: false,
  }
}
