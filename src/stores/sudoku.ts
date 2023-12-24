import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Sudoku, IndexedSudoku } from '../utils/types'

export const usePuzzleStore = defineStore('puzzle', () => {
  const puzzleData = ref<Sudoku>([
    [2, 7, 1, 4, 6, 5, 9, 3, 2],
    [4, 3, 8, 2, 7, 9, 5, 6, 1],
    [5, 9, 6, 8, 1, 3, 2, 4, 7],
    [7, 4, 5, 6, 2, 8, 1, 5, 9],
    [6, 5, 2, 1, 9, 7, 3, 8, 4],
    [1, 8, 9, 3, 5, 4, 7, 2, 6],
    [8, 1, 4, 7, 3, 2, 6, 9, 5],
    [9, 2, 7, 5, 8, 6, 4, 1, 3],
    [3, 6, 5, 9, 4, 1, 8, 7, 2]
  ])

  const indexedSudoku = ref<IndexedSudoku[][]>([])

  const makePuzzleIndexed = (arr: Sudoku) => {
    arr.forEach((line: number[], columnIndex: number) => {
      indexedSudoku.value.push(
        line.map((item: number, index: number) => {
          return {
            item,
            lineIndex: index,
            columnIndex
          }
        })
      )
    })
  }

  makePuzzleIndexed(puzzleData.value)

  const puzzle = computed(() => puzzleData.value)

  return { puzzle, indexedSudoku }
})
