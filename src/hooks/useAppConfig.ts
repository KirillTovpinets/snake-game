import { RefObject, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { setFieldConfig } from '../features/game'
import { CellConfig } from '../interfaces'
import { CELL_WIDTH_IN_PERCENTAGE } from '../constants'

export const useAppConfig = (fieldRef: RefObject<HTMLDivElement>) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!fieldRef || !fieldRef.current) {
      return
    }

    const fieldWidth = (fieldRef.current as HTMLDivElement).clientWidth
    const fieldHeight = (fieldRef.current as HTMLDivElement).clientHeight

    const ratio = fieldHeight / fieldWidth

    const width = fieldWidth * (CELL_WIDTH_IN_PERCENTAGE / 100)
    const height = width * ratio

    const cellRowCount = Math.ceil(fieldWidth / width)
    const numRows = Math.floor(fieldHeight / height)

    let createdCellIndex = 0
    let rowIndex = 0
    const totalCount = cellRowCount * numRows
    const cellCollection = Array.from({ length: totalCount }).map(() => {
      const x = createdCellIndex++ % cellRowCount
      const y = rowIndex

      const id = uuid()
      const cell: CellConfig = {
        id,
        width,
        height,
        x,
        y,
        next: null,
      }

      if (createdCellIndex === cellRowCount) {
        rowIndex++
        createdCellIndex = 0
      }

      return cell
    })

    dispatch(
      setFieldConfig({ size: [numRows, cellRowCount], cells: cellCollection })
    )
  }, [fieldRef])
}
