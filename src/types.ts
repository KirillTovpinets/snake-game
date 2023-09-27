import { CellConfig } from './interfaces'

export enum KeyboardCodes {
  right = 'ArrowRight',
  left = 'ArrowLeft',
  up = 'ArrowUp',
  down = 'ArrowDown',
}

export class Snake {
  public head: CellConfig

  constructor(cell: CellConfig) {
    this.head = cell
  }
}
