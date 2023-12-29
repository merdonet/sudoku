<template>
  <div class="d-flex justify-center flex-column ma-10 pa-0 puzzle-layout">
    <div>
      <v-select
        :items="difficultyLevels"
        item-title="label"
        item-value="value"
        density="compact"
        hint="Select difficulty level"
        persistent-hint
        @update:model-value="setDificulty"
      >
      </v-select>
    </div>
    <template v-for="(line, lineIndex) in indexedSudoku" :key="lineIndex">
      <v-divider
        v-if="lineIndex % 3 == 0 || lineIndex == 9"
        thickness="3"
        class="border-opacity-100"
        color="black"
      />
      <div class="ma-0 d-flex flex-row">
        <template v-for="(item, columnIndex) in line" :key="item.item">
          <v-divider
            v-if="columnIndex % 3 == 0"
            thickness="3"
            vertical
            class="border-opacity-100 d-flex flex-row"
            color="black"
          />
          <CellComponent
            :cell-data="item"
            @update:selected-item="onCellSelect"
            :selected-cell="isSelected(item)"
          />
        </template>
        <v-divider
          thickness="3"
          vertical
          class="border-opacity-100 d-flex flex-row"
          color="black"
        />
      </div>
    </template>
    <v-divider thickness="3" class="border-opacity-100" color="black" />
  </div>
  <div class="ma-10">
    <NumberBlock @update:cell-value="onUpdateCellValue" />
  </div>
</template>

<script setup lang="ts">
import { usePuzzleStore } from '@/stores/sudoku';
import CellComponent from '@/components/ui-sudoku/CellComponent.vue';
import NumberBlock from '@/components/ui-sudoku/NumberBlock.vue';

import type { Cell } from '@/utils/types';
import { onMounted } from 'vue';
import { nextTick } from 'vue';

const {
  indexedSudoku,
  updateSelectedCellStatus,
  getSelectedCell,
  updateSelectedCell,
  prepareDifficulty,
  resetPuzzle
} = usePuzzleStore();

type CheckSet = {
  number: number;
  index: number;
};

const onCellSelect = (val: Cell) => {
  updateSelectedCellStatus(val);
};

const isSelected = (item: Cell) => {
  if (!getSelectedCell.value) return false;
  const { columnIndex, lineIndex } = getSelectedCell.value;

  return item.columnIndex == columnIndex && item.lineIndex == lineIndex;
};

const onUpdateCellValue = async (value: number) => {
  updateSelectedCell(value);
};

const difficultyLevels = [
  { label: 'Easy', value: 5 },
  { label: 'Hard', value: 4 },
  { label: 'Hard++', value: 3 }
];

const setDificulty = async (difficulty: number = 5) => {
  // resetPuzzle();
  indexedSudoku.forEach((puzzleLine: Array<Cell>) => {
    for (let index = 0; index < difficulty; index++) {
      const ran = Math.floor(Math.random() * puzzleLine.length);
      console.log('random', ran);
      prepareDifficulty(puzzleLine[ran]);
    }
  });
};

onMounted(async () => {
  // makeIndexed();
  // resetPuzzle();

  console.log(setDificulty(2));
});

const checkPuzzleLine = (arr: number[]): CheckSet[] => {
  const result: CheckSet[] = [];
  arr.forEach((item: number, index: number) => {
    const res = arr.filter((it) => item == it);
    if (res.length > 1) result.push({ number: res[0], index });
  });
  return result;
};

const makeColumnArray = (puzzle: number[][]) => {
  const cols = [];
  for (let index = 0; index <= puzzle[0].length - 1; index++) {
    const col = [];
    for (let colIndex = 0; colIndex <= puzzle.length - 1; colIndex++) {
      const item: number | undefined = puzzle[colIndex][index];
      col.push(item);
    }
    cols.push(col);
  }
  return cols;
};
</script>

<style scoped>
.puzzle-layout {
  max-width: max-content;
}
</style>
