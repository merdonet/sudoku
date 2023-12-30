type Sudoku = number[][];

type CheckSet = Cell[];

type Cell = {
  id: string;
  columnIndex: number;
  lineIndex: number;
  lock: Boolean;
  userValue: number;
  val: number;
};

type Difficulty = { label: string; value: number };

export type { Sudoku, CheckSet, Cell, Difficulty };
