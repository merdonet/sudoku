import type { Sudoku, CheckSet } from './types'

// const sudokuData: Sudoku = [
//   [2, 7, 1, 4, 6, 5, 9, 3, 8],
//   [4, 3, 8, 2, 7, 9, 5, 6, 1],
//   [5, 9, 6, 8, 1, 3, 2, 4, 7],
//   [7, 4, 5, 6, 2, 8, 1, 5, 9],
//   [6, 5, 2, 1, 9, 7, 3, 8, 4],
//   [1, 8, 9, 3, 5, 4, 7, 2, 6],
//   [8, 1, 4, 7, 3, 2, 6, 9, 5],
//   [9, 2, 7, 5, 8, 6, 4, 1, 3],
//   [3, 6, 5, 9, 4, 1, 8, 7, 2]
// ]

const getAllBlocks = (sudokuData: Sudoku) => {
  const allBlocks = []

  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      const blockValues = getBlockValues(sudokuData, i, j)
      allBlocks.push(blockValues)
    }
  }

  return allBlocks
}

const getBlockValues = (sudokuData: Sudoku, startRow: number, startCol: number) => {
  const blockValues = []

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const rowIndex = startRow + i
      const colIndex = startCol + j
      const cellValue = sudokuData[rowIndex][colIndex]
      blockValues.push(cellValue)
    }
  }

  return blockValues
}

const checkPuzzleLine = (arr: number[]): CheckSet[] => {
  const result: CheckSet[] = []
  arr.forEach((item: number, index: number) => {
    const res = arr.filter((it) => item == it)
    if (res.length > 1) result.push({ number: res[0], index })
  })
  return result
}

const makeColumnArray = (puzzle: Sudoku) => {
  const cols = []
  for (let index = 0; index <= puzzle[0].length - 1; index++) {
    const col = []
    for (let colIndex = 0; colIndex <= puzzle.length - 1; colIndex++) {
      const item: number = puzzle[colIndex][index]
      col.push(item)
    }
    cols.push(col)
  }
  return cols
}

export { checkPuzzleLine, getAllBlocks, makeColumnArray }
