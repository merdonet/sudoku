type Sudoku = number[][];

type CheckSet = {
  number: number;
  index: number;
};

type Cell = {
  columnIndex: number;
  lineIndex: number;
  lock: Boolean;
  userValue: number;
  value: number;
};

export type { Sudoku, CheckSet, Cell };
