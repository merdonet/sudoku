import type { Sudoku, Cell, Difficulty } from '../utils/types';

const puzzleData: Sudoku = [
  [8, 3, 5, 4, 1, 6, 9, 2, 7],
  [2, 9, 6, 8, 5, 7, 4, 3, 1],
  [4, 1, 7, 2, 9, 3, 6, 5, 8],
  [5, 6, 9, 1, 3, 4, 7, 8, 2],
  [1, 2, 3, 6, 7, 8, 5, 4, 9],
  [7, 4, 8, 5, 2, 9, 1, 6, 3],
  [6, 5, 2, 7, 8, 1, 3, 9, 4],
  [9, 8, 1, 3, 4, 5, 2, 7, 6],
  [3, 7, 4, 9, 6, 2, 8, 1, 5]
];

const difficultyLevels: Difficulty[] = [
  { label: 'Easy', value: 5 },
  { label: 'Hard', value: 4 },
  { label: 'Hard++', value: 3 }
];

export { puzzleData, difficultyLevels };
