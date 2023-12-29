import { ref, computed } from 'vue';
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

  const indexedSudoku = computed(() => {
    return puzzle.value.map((line: number[], columnIndex: number) => {
      return line.map((item: number, index: number) => {
        return {
          value: item,
          lineIndex: index,
          columnIndex,
          lock: true,
          userValue: 0
        };
      });
    });
  });

  const selectedCell = ref<Cell>();

  const updateSelectedCell = (val: Cell) => {
    selectedCell.value = val;
  };

  const getSelectedCell = computed(() => selectedCell);
  const puzzle = computed(() => puzzleData.value);

  return { puzzle, indexedSudoku, updateSelectedCell, getSelectedCell };
});
