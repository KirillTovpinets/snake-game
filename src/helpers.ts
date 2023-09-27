import { Position } from './interfaces'

export const getRandormCoordinates = (
  rowsCount: number,
  colCount: number
): Position => {
  const randomX = Math.floor(Math.random() * (colCount + 1))
  const randomY = Math.floor(Math.random() * (rowsCount + 1))
  return { x: randomX, y: randomY }
}
