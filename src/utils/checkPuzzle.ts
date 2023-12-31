import type { Cell } from './types';

const makeIndexed = (puzzleData: number[][]) => {
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

const checkHighligts = (arr: Cell[][], searchValue: number): Array<any> => {
  const idArr = arr.map((line: Cell[]) => {
    return line.map((item: Cell) => {
      if (item.userValue == 0) return undefined;
      if (item.userValue == searchValue) return item.id;
    });
  });
  const result: string[] = [];

  idArr.forEach((line) => {
    line.forEach((item) => {
      if (item != undefined) result.push(item);
    });
  });

  return result;
};

export { makeIndexed, getAllBlocks, makeColumnArray, checkPuzzleLines, checkHighligts };
