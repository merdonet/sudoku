import type { Sudoku, CheckSet, Cell } from './types';

// const sudokuData: Sudoku = [
//   [2, 7, 1, 4, 6, 5, 9, 3, 8],
//   [4, 3, 8, 2, 7, 9, 5, 6, 1],
//   [5, 9, 6, 8, 1, 3, 2, 4, 7],
//   [7, 4, 5, 6, 2, 8, 1, 5, 9],
//   [6, 5, 2, 1, 9, 7, 3, 8, 4],
//   [1, 8, 9, 3, 5, 4, 7, 2, 6],
//   [8, 1, 4, 7, 3, 2, 6, 9, 5],
//   [9, 2, 7, 5, 8, 6, 4, 1, 3],
//   [3, 6, 5, 9, 4, 1, 8, 7, 2]
// ]

const getAllBlocks = (sudokuData: Cell[][]) => {
  const allBlocks = [];

  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      const blockValues = getBlockValues(sudokuData, i, j);
      allBlocks.push(blockValues);
    }
  }

  return allBlocks;
};

const getBlockValues = (sudokuData: Cell[][], startRow: number, startCol: number) => {
  const blockValues = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const rowIndex = startRow + i;
      const colIndex = startCol + j;
      const cellValue = sudokuData[rowIndex][colIndex];
      blockValues.push(cellValue);
    }
  }

  return blockValues;
};

const checkPuzzleLine = (arr: Cell[]): Cell[] => {
  const result: Cell[] = [];
  arr.forEach((item: Cell) => {
    const found = arr.filter((it) => item.val == it.val);
    if (found.length > 1) {
      found.forEach((res) => {
        if (!result.find((item) => item.id == res.id)) {
          result.push(res);
        }
      });
    }
  });
  console.log(result);

  return result;
};

const checkPuzzleLines = (arr: Cell[][]): string[] => {
  const result: string[] = [];
  arr.forEach((line: Cell[]) => {
    line.forEach((item: Cell) => {
      if (item.userValue != 0) {
        const found = line.filter(
          (it) => item.userValue == it.userValue || (item.userValue == it.val && it.lock == true)
        );
        if (found.length > 1) {
          found.forEach((res) => {
            if (!result.find((item) => item == res.id)) {
              result.push(res.id);
            }
          });
        }
      }
    });
  });

  return result;
};

const checkPuzzle = (arr: Cell[][]): Cell[] => {
  const result: Cell[] = [];
  arr.forEach((line: Cell[]) => {
    line.forEach((item: Cell) => {
      const found = line.filter((it) => item.val == it.val && item.userValue != 0);
      if (found.length > 1) {
        found.forEach((res) => {
          if (!result.find((item) => item.id == res.id)) {
            result.push(res);
          }
        });
      }
    });
  });

  return result;
};

const makeColumnArray = (puzzle: Cell[][]) => {
  const cols = [];
  for (let index = 0; index <= puzzle[0].length - 1; index++) {
    const col = [];
    for (let colIndex = 0; colIndex <= puzzle.length - 1; colIndex++) {
      const item: Cell = puzzle[colIndex][index];
      col.push(item);
    }
    cols.push(col);
  }
  return cols;
};

const findCell = (puzzle: Cell[][], cell: Cell) => {
  return puzzle[cell.columnIndex][cell.columnIndex];
};

export { checkPuzzleLine, getAllBlocks, makeColumnArray, findCell, checkPuzzleLines };
