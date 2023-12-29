import { ref, computed, reactive, type ComputedRef } from 'vue';
import { defineStore } from 'pinia';
import type { Sudoku, Cell } from '../utils/types';

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
  ]);

  const makeIndexed = () => {
    return puzzleData.value.map((line: number[], columnIndex: number) => {
      return line.map((item: number, index: number) => {
        return {
          val: item,
          lineIndex: index,
          columnIndex,
          lock: false,
          userValue: 0
        };
      });
    });
  };
  const indexedSudoku = ref();
  indexedSudoku.value = makeIndexed();

  const selectedCell = ref<Cell>();

  const updateSelectedCellStatus = (val: Cell) => {
    selectedCell.value = val;
  };

  const resetPuzzle = () => {
    indexedSudoku.value = makeIndexed();
  };

  const updateSelectedCell = (value: number) => {
    if (!selectedCell.value) return;
    const { columnIndex, lineIndex } = selectedCell.value;

    indexedSudoku.value[columnIndex][lineIndex].userValue = value;
  };

  const prepareDifficulty = (cell: Cell) => {
    const { columnIndex, lineIndex } = cell;

    indexedSudoku.value[columnIndex][lineIndex].lock = true;
  };

  const getSelectedCell = computed(() => selectedCell);
  const puzzle = computed(() => puzzleData);

  return {
    puzzle,
    indexedSudoku,
    updateSelectedCellStatus,
    getSelectedCell,
    updateSelectedCell,
    prepareDifficulty,
    resetPuzzle
  };
});
