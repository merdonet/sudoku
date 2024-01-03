import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Cell, Difficulty, History } from '../utils/types';
import { puzzleData } from './sudokuData';
import {
  makeIndexed,
  checkPuzzleLines,
  getAllBlocks,
  makeColumnArray,
  checkHighligts
} from '@/utils/checkPuzzle';

export const usePuzzleStore = defineStore('puzzle', () => {
  const indexedSudoku = ref();
  indexedSudoku.value = makeIndexed(puzzleData);

  const selectedCell = ref<Cell>();
  const history = ref<Array<History>>([]);

  const updateSelectedCellStatus = (val: Cell) => {
    selectedCell.value = val;
    highLights.value = checkHighligts(indexedSudoku.value, val.userValue);
  };

  const resetPuzzle = () => {
    indexedSudoku.value.forEach((line: Array<Cell>) =>
      line.forEach((item) => {
        item.lock = false;
        item.userValue = 0;
      })
    );
  };

  const updateSelectedCell = (value: number) => {
    if (!selectedCell.value) return;
    const { columnIndex, lineIndex, id, userValue } = selectedCell.value;

    history.value.push({
      id,
      oldValue: userValue,
      newValue: value
    });

    indexedSudoku.value[columnIndex][lineIndex].userValue = value;
    checkErrors();
    highLights.value = checkHighligts(indexedSudoku.value, value);
  };

  const prepareDifficulty = (cell: Cell) => {
    const { columnIndex, lineIndex } = cell;

    indexedSudoku.value[columnIndex][lineIndex].lock = true;
    indexedSudoku.value[columnIndex][lineIndex].userValue =
      indexedSudoku.value[columnIndex][lineIndex].val;
  };

  const setDifficulty = async (difficulty: Difficulty) => {
    resetPuzzle();
    const diffList = [];
    for (let i = 0; i < 9; i++) {
      for (let k = 0; k < difficulty.value; k++) {
        const ran = Math.floor(Math.random() * 8);
        diffList.push(`${i}-${ran}`);
      }
    }

    diffList.forEach((item) => {
      const [columnIndex, lineIndex] = item.split('-');
      indexedSudoku.value[columnIndex][lineIndex].lock = true;
      indexedSudoku.value[columnIndex][lineIndex].userValue =
        indexedSudoku.value[columnIndex][lineIndex].val;
    });
  };

  const getSelectedCell = computed(() => selectedCell);
  const puzzle = computed(() => puzzleData);

  const errorCells = ref<string[]>([]);
  const highLights = ref<string[]>([]);

  const checkErrors = () => {
    errorCells.value = [];
    const lineErrs = checkPuzzleLines(indexedSudoku.value);
    const columnErrs = checkPuzzleLines(makeColumnArray(indexedSudoku.value));
    const blockErrs = checkPuzzleLines(getAllBlocks(indexedSudoku.value));

    lineErrs.forEach((i) => errorCells.value.push(i));
    columnErrs.forEach((i) => errorCells.value.push(i));
    blockErrs.forEach((i) => errorCells.value.push(i));
  };

  const getErrorCells = computed(() => errorCells);

  const getHighLights = computed(() => highLights);

  const applyUndo = () => {
    const lastMove = history.value.pop();
    if (!lastMove) return;
    const [columnIndex, lineIndex] = lastMove.id.split('-');

    indexedSudoku.value[columnIndex][lineIndex].userValue = lastMove.oldValue;
    updateSelectedCellStatus(indexedSudoku.value[columnIndex][lineIndex].userValue);
    checkErrors();
  };

  return {
    puzzle,
    indexedSudoku,
    updateSelectedCellStatus,
    getSelectedCell,
    updateSelectedCell,
    prepareDifficulty,
    resetPuzzle,
    setDifficulty,
    getErrorCells,
    getHighLights,
    applyUndo
  };
});
