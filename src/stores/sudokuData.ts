import type { Sudoku, Cell, Difficulty } from '../utils/types';

const puzzleData: Sudoku = [
  [2, 7, 1, 4, 6, 5, 9, 3, 8],
  [4, 3, 8, 2, 7, 9, 5, 6, 1],
  [5, 9, 6, 8, 1, 3, 2, 4, 7],
  [7, 4, 5, 6, 2, 8, 1, 3, 9],
  [6, 5, 2, 1, 9, 7, 3, 8, 4],
  [1, 8, 9, 3, 5, 4, 7, 2, 6],
  [8, 1, 4, 7, 3, 2, 6, 9, 5],
  [9, 2, 7, 5, 8, 6, 4, 1, 3],
  [3, 6, 5, 9, 4, 1, 8, 7, 2]
];

const difficultyLevels: Difficulty[] = [
  { label: 'Easy', value: 5 },
  { label: 'Hard', value: 4 },
  { label: 'Hard++', value: 3 }
];

export { puzzleData, difficultyLevels };
