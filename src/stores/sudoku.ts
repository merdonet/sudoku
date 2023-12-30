import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Cell, Difficulty } from '../utils/types';
import { puzzleData } from './sudokuData';
import {
  checkPuzzleLine,
  checkPuzzleLines,
  getAllBlocks,
  makeColumnArray
} from '@/utils/checkPuzzle';

const data = [
  [
    { val: 2, lineIndex: 0, columnIndex: 0, lock: false, userValue: 0 },
    { val: 7, lineIndex: 1, columnIndex: 0, lock: false, userValue: 0 },
    { val: 1, lineIndex: 2, columnIndex: 0, lock: false, userValue: 0 },
    { val: 4, lineIndex: 3, columnIndex: 0, lock: true, userValue: 0 },
    { val: 6, lineIndex: 4, columnIndex: 0, lock: true, userValue: 0 },
    { val: 5, lineIndex: 5, columnIndex: 0, lock: false, userValue: 0 },
    { val: 9, lineIndex: 6, columnIndex: 0, lock: false, userValue: 0 },
    { val: 3, lineIndex: 7, columnIndex: 0, lock: true, userValue: 0 },
    { val: 8, lineIndex: 8, columnIndex: 0, lock: false, userValue: 0 }
  ],
  [
    { val: 4, lineIndex: 0, columnIndex: 1, lock: true, userValue: 0 },
    { val: 3, lineIndex: 1, columnIndex: 1, lock: true, userValue: 0 },
    { val: 8, lineIndex: 2, columnIndex: 1, lock: true, userValue: 0 },
    { val: 2, lineIndex: 3, columnIndex: 1, lock: false, userValue: 0 },
    { val: 7, lineIndex: 4, columnIndex: 1, lock: false, userValue: 0 },
    { val: 9, lineIndex: 5, columnIndex: 1, lock: false, userValue: 0 },
    { val: 5, lineIndex: 6, columnIndex: 1, lock: false, userValue: 0 },
    { val: 6, lineIndex: 7, columnIndex: 1, lock: false, userValue: 0 },
    { val: 1, lineIndex: 8, columnIndex: 1, lock: true, userValue: 0 }
  ],
  [
    { val: 5, lineIndex: 0, columnIndex: 2, lock: false, userValue: 0 },
    { val: 9, lineIndex: 1, columnIndex: 2, lock: true, userValue: 0 },
    { val: 6, lineIndex: 2, columnIndex: 2, lock: false, userValue: 0 },
    { val: 8, lineIndex: 3, columnIndex: 2, lock: false, userValue: 0 },
    { val: 1, lineIndex: 4, columnIndex: 2, lock: false, userValue: 0 },
    { val: 3, lineIndex: 5, columnIndex: 2, lock: true, userValue: 0 },
    { val: 2, lineIndex: 6, columnIndex: 2, lock: false, userValue: 0 },
    { val: 4, lineIndex: 7, columnIndex: 2, lock: true, userValue: 0 },
    { val: 7, lineIndex: 8, columnIndex: 2, lock: true, userValue: 0 }
  ],
  [
    { val: 7, lineIndex: 0, columnIndex: 3, lock: false, userValue: 0 },
    { val: 4, lineIndex: 1, columnIndex: 3, lock: false, userValue: 0 },
    { val: 5, lineIndex: 2, columnIndex: 3, lock: false, userValue: 0 },
    { val: 6, lineIndex: 3, columnIndex: 3, lock: true, userValue: 0 },
    { val: 2, lineIndex: 4, columnIndex: 3, lock: false, userValue: 0 },
    { val: 8, lineIndex: 5, columnIndex: 3, lock: true, userValue: 0 },
    { val: 1, lineIndex: 6, columnIndex: 3, lock: false, userValue: 0 },
    { val: 5, lineIndex: 7, columnIndex: 3, lock: true, userValue: 0 },
    { val: 9, lineIndex: 8, columnIndex: 3, lock: true, userValue: 0 }
  ],
  [
    { val: 6, lineIndex: 0, columnIndex: 4, lock: true, userValue: 0 },
    { val: 5, lineIndex: 1, columnIndex: 4, lock: false, userValue: 0 },
    { val: 2, lineIndex: 2, columnIndex: 4, lock: false, userValue: 0 },
    { val: 1, lineIndex: 3, columnIndex: 4, lock: true, userValue: 0 },
    { val: 9, lineIndex: 4, columnIndex: 4, lock: false, userValue: 0 },
    { val: 7, lineIndex: 5, columnIndex: 4, lock: false, userValue: 0 },
    { val: 3, lineIndex: 6, columnIndex: 4, lock: true, userValue: 0 },
    { val: 8, lineIndex: 7, columnIndex: 4, lock: false, userValue: 0 },
    { val: 4, lineIndex: 8, columnIndex: 4, lock: true, userValue: 0 }
  ],
  [
    { val: 1, lineIndex: 0, columnIndex: 5, lock: false, userValue: 0 },
    { val: 8, lineIndex: 1, columnIndex: 5, lock: false, userValue: 0 },
    { val: 9, lineIndex: 2, columnIndex: 5, lock: false, userValue: 0 },
    { val: 3, lineIndex: 3, columnIndex: 5, lock: false, userValue: 0 },
    { val: 5, lineIndex: 4, columnIndex: 5, lock: true, userValue: 0 },
    { val: 4, lineIndex: 5, columnIndex: 5, lock: true, userValue: 0 },
    { val: 7, lineIndex: 6, columnIndex: 5, lock: false, userValue: 0 },
    { val: 2, lineIndex: 7, columnIndex: 5, lock: false, userValue: 0 },
    { val: 6, lineIndex: 8, columnIndex: 5, lock: false, userValue: 0 }
  ],
  [
    { val: 8, lineIndex: 0, columnIndex: 6, lock: false, userValue: 0 },
    { val: 1, lineIndex: 1, columnIndex: 6, lock: true, userValue: 0 },
    { val: 4, lineIndex: 2, columnIndex: 6, lock: false, userValue: 0 },
    { val: 7, lineIndex: 3, columnIndex: 6, lock: true, userValue: 0 },
    { val: 3, lineIndex: 4, columnIndex: 6, lock: false, userValue: 0 },
    { val: 2, lineIndex: 5, columnIndex: 6, lock: true, userValue: 0 },
    { val: 6, lineIndex: 6, columnIndex: 6, lock: false, userValue: 0 },
    { val: 9, lineIndex: 7, columnIndex: 6, lock: false, userValue: 0 },
    { val: 5, lineIndex: 8, columnIndex: 6, lock: false, userValue: 0 }
  ],
  [
    { val: 9, lineIndex: 0, columnIndex: 7, lock: false, userValue: 0 },
    { val: 2, lineIndex: 1, columnIndex: 7, lock: false, userValue: 0 },
    { val: 7, lineIndex: 2, columnIndex: 7, lock: true, userValue: 0 },
    { val: 5, lineIndex: 3, columnIndex: 7, lock: false, userValue: 0 },
    { val: 8, lineIndex: 4, columnIndex: 7, lock: false, userValue: 0 },
    { val: 6, lineIndex: 5, columnIndex: 7, lock: true, userValue: 0 },
    { val: 4, lineIndex: 6, columnIndex: 7, lock: false, userValue: 0 },
    { val: 1, lineIndex: 7, columnIndex: 7, lock: true, userValue: 0 },
    { val: 3, lineIndex: 8, columnIndex: 7, lock: true, userValue: 0 }
  ],
  [
    { val: 3, lineIndex: 0, columnIndex: 8, lock: false, userValue: 0 },
    { val: 6, lineIndex: 1, columnIndex: 8, lock: true, userValue: 0 },
    { val: 5, lineIndex: 2, columnIndex: 8, lock: false, userValue: 0 },
    { val: 9, lineIndex: 3, columnIndex: 8, lock: false, userValue: 0 },
    { val: 4, lineIndex: 4, columnIndex: 8, lock: false, userValue: 0 },
    { val: 1, lineIndex: 5, columnIndex: 8, lock: true, userValue: 0 },
    { val: 8, lineIndex: 6, columnIndex: 8, lock: false, userValue: 0 },
    { val: 7, lineIndex: 7, columnIndex: 8, lock: false, userValue: 0 },
    { val: 2, lineIndex: 8, columnIndex: 8, lock: true, userValue: 0 }
  ]
];

export const usePuzzleStore = defineStore('puzzle', () => {
  const makeIndexed = () => {
    return puzzleData.map((line: number[], columnIndex: number) => {
      return line.map((item: number, index: number) => {
        return {
          id: `${columnIndex}-${index}`,
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
    indexedSudoku.value.forEach((line: Array<Cell>) => line.forEach((item) => (item.lock = false)));
  };

  const updateSelectedCell = (value: number) => {
    if (!selectedCell.value) return;
    const { columnIndex, lineIndex } = selectedCell.value;

    indexedSudoku.value[columnIndex][lineIndex].userValue = value;
    checkErrors();
  };

  const prepareDifficulty = (cell: Cell) => {
    const { columnIndex, lineIndex } = cell;

    indexedSudoku.value[columnIndex][lineIndex].lock = true;
  };

  const setDifficulty = (difficulty: Difficulty) => {
    resetPuzzle();
    indexedSudoku.value.forEach((puzzleLine: Array<Cell>) => {
      for (let index = 0; index < difficulty.value; index++) {
        const ran = Math.floor(Math.random() * puzzleLine.length);
        prepareDifficulty(puzzleLine[ran]);
      }
    });
  };

  setDifficulty({ label: 'Easy', value: 5 });

  const getSelectedCell = computed(() => selectedCell);
  const puzzle = computed(() => puzzleData);

  const errorCells = ref<string[]>([]);

  const checkErrors = () => {
    errorCells.value = [];
    const lineErrs = checkPuzzleLines(indexedSudoku.value);
    const columnErrs = checkPuzzleLines(makeColumnArray(indexedSudoku.value));
    const blockErrs = checkPuzzleLines(getAllBlocks(indexedSudoku.value));

    lineErrs.forEach((i) => errorCells.value.push(i));
    columnErrs.forEach((i) => errorCells.value.push(i));
    blockErrs.forEach((i) => errorCells.value.push(i));
  };

  checkErrors();

  const getErrorCells = computed(() => errorCells);

  console.log(makeColumnArray(indexedSudoku.value));

  return {
    puzzle,
    indexedSudoku,
    updateSelectedCellStatus,
    getSelectedCell,
    updateSelectedCell,
    prepareDifficulty,
    resetPuzzle,
    setDifficulty,
    getErrorCells
  };
});
