<template>
  <div class="d-flex justify-center flex-column ma-10 pa-0 puzzle-layout">
    <div>
      <v-select
        v-model="defaultLevel"
        :items="difficultyLevels"
        item-title="label"
        item-value="value"
        density="compact"
        hint="Select difficulty level"
        persistent-hint
        return-object
        variant="plain"
        class="diff-level mb-4"
        @update:model-value="onSetDifficulty"
      />
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
            :error="isError(item)"
            :high-lighted="isHighLighted(item)"
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
  {{ history }}
</template>

<script setup lang="ts">
import { usePuzzleStore } from '@/stores/sudoku';
import CellComponent from '@/components/ui-sudoku/CellComponent.vue';
import NumberBlock from '@/components/ui-sudoku/NumberBlock.vue';
import { difficultyLevels } from '@/stores/sudokuData';
import type { Cell, Difficulty } from '@/utils/types';
import { ref } from 'vue';
import { isTemplateExpression } from 'typescript';

const {
  indexedSudoku,
  updateSelectedCellStatus,
  getSelectedCell,
  updateSelectedCell,
  setDifficulty,
  getErrorCells,
  getHighLights,
  history
} = usePuzzleStore();

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

const defaultLevel = ref<Difficulty>({ label: 'Easy', value: 5 });
const onSetDifficulty = (val: Difficulty) => {
  setDifficulty(val);
};

const isError = (val: Cell) => {
  const errorFound = getErrorCells.value.filter((item: string) => item == val.id);
  if (errorFound.length > 0) return true;
};

const isHighLighted = (val: Cell) => {
  const found = getHighLights.value.filter((item: string) => item == val.id);
  if (found.length > 0) return true;
};
</script>

<style scoped>
.puzzle-layout {
  max-width: max-content;
}

.diff-level {
  max-width: 200px;
}
</style>
