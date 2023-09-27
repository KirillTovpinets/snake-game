import { RefObject, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import {
  initilizeSnake,
  setApplePosition,
  setFieldConfig,
  setFieldSize,
} from '../features/game'
import { getRandormCoordinates } from '../helpers'
import { CellConfig } from '../interfaces'

export const useAppConfig = (fieldRef: RefObject<HTMLDivElement>) => {
  const CELL_HEIGHT = 4
  const dispatch = useDispatch()
  let snakeInitialCell: CellConfig | undefined

  useEffect(() => {
    if (!fieldRef || !fieldRef.current) {
      return
    }

    const fieldWidth = (fieldRef.current as HTMLDivElement).clientWidth
    const fieldHeight = (fieldRef.current as HTMLDivElement).clientHeight

    const ratio = fieldHeight / fieldWidth

    const width = fieldWidth * (CELL_HEIGHT / 100)
    const height = width * ratio

    const cellRowCount = Math.ceil(fieldWidth / width)
    const numRows = Math.floor(fieldHeight / height)

    let createdCellIndex = 0
    let rowIndex = 0
    const totalCount = cellRowCount * numRows

    const appleCoordinates = getRandormCoordinates(numRows, cellRowCount)
    dispatch(setApplePosition(appleCoordinates))

    const cellCollection = Array.from({ length: totalCount }).map(() => {
      const x = createdCellIndex++ % cellRowCount
      const y = rowIndex

      const id = uuid()
      const isActive =
        y === Math.floor(numRows / 2) && x === Math.floor(cellRowCount / 2)

      const cell: CellConfig = {
        id,
        width,
        height,
        x,
        y,
        next: null,
      }

      snakeInitialCell = isActive ? cell : snakeInitialCell
      if (createdCellIndex === cellRowCount) {
        rowIndex++
        createdCellIndex = 0
      }

      return cell
    })

    dispatch(setFieldSize([numRows, cellRowCount]))
    dispatch(setFieldConfig(cellCollection))
    dispatch(initilizeSnake(snakeInitialCell))
  }, [fieldRef])
}
