type Sudoku = number[][]

type CheckSet = {
  number: number
  index: number
}

type IndexedSudoku = {
  item: number
  lineIndex: number
  columnIndex: number
}

export type { Sudoku, CheckSet, IndexedSudoku }
