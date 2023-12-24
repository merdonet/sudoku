<template>
  <div class="ma-10">
    <template v-for="(line, lineIndex) in indexedSudoku" :key="lineIndex">
      <v-divider v-if="lineIndex % 3 == 0" thickness="3" class="border-opacity-100" color="black" />
      <div class="ma-0 d-flex flex-row">
        <template v-for="(item, columnIndex) in line" :key="item.item">
          <v-divider
            v-if="columnIndex % 3 == 0"
            thickness="3"
            vertical
            class="border-opacity-100"
            color="black"
          />
          <CellComponent :cell-data="item" />
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { usePuzzleStore } from '@/stores/sudoku'
import CellComponent from '@/components/ui-sudoku/CellComponent.vue'

const { puzzle, indexedSudoku } = usePuzzleStore()

type CheckSet = {
  number: number
  index: number
}

const checkPuzzleLine = (arr: number[]): CheckSet[] => {
  const result: CheckSet[] = []
  arr.forEach((item: number, index: number) => {
    const res = arr.filter((it) => item == it)
    if (res.length > 1) result.push({ number: res[0], index })
  })
  return result
}

const makeColumnArray = (puzzle: number[][]) => {
  const cols = []
  for (let index = 0; index <= puzzle[0].length - 1; index++) {
    const col = []
    for (let colIndex = 0; colIndex <= puzzle.length - 1; colIndex++) {
      const item: number | undefined = puzzle[colIndex][index]
      col.push(item)
    }
    cols.push(col)
  }
  return cols
}

const reduceCell = puzzle.reduce((acc: any, item: any, index: any, arr: any) => {
  const col = []

  col.push(item.slice(0, 3))
  col.push(item.slice(3, 6))
  col.push(item.slice(6, 9))
  acc.push(col)
  return acc
}, [])

console.log(reduceCell)

// const columnArray = makeColumnArray(puzzle)

// console.log('columnArray', columnArray)

const splitCells = (puzzleArray: number[][]) => {
  const cells: any = []

  for (let index = 0; index < puzzleArray.length; index++) {
    const cell = []
    cell.push(puzzleArray[0].slice(0, 3))
    cell.push(puzzleArray[0].slice(3, 6))
    cell.push(puzzleArray[0].slice(6, 9))
    // cells.push[[cell]]
  }

  return cells
}

// console.log(splitCells(puzzle))

// console.log(puzzle)

// console.log(checkPuzzleLine(puzzle[0]))
// // console.log(checkPuzzleLine(columnArray[0]))
</script>
