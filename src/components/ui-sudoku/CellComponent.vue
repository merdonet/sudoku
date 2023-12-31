<template>
  <div class="d-flex flex-row" :class="backColorClass">
    <v-btn
      class="cell pa-0 ma-0 rounded-0"
      flat
      variant="outlined"
      :active="selectedCell"
      :ripple="false"
      size="small"
      @click="onClick"
      :color="cellColor"
    >
      <span class="cell-value ma-0 pa-0">{{ cellValue }}</span>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  cellData: {
    type: Object,
    required: true
  },
  selectedCell: {
    type: Boolean
  },
  error: {
    type: Boolean
  },
  highLighted: {
    type: Boolean
  }
});

const emit = defineEmits(['update:selected-item']);

const onClick = () => {
  emit('update:selected-item', props.cellData);
};

const cellColor = computed(() => {
  if (props.error) return 'red-lighten-1';
  if (props.selectedCell) return 'blue-darken-3';
  if (props.highLighted) return 'blue-darken-3';
  return '';
});

const cellValue = computed(() => {
  if (props.cellData.userValue != 0) return props.cellData.userValue;
  if (props.cellData.lock) return props.cellData.val;

  return '';
});

const backColorClass = computed(() => {
  if (props.cellData.lock && props.error) return 'locked-cell';
  if (props.selectedCell) return 'selected-cell';
  if (props.error) return 'error-cell';
  if (props.cellData.lock) return 'locked-cell';
  return '';

  // TODO: find better background colors.
});
</script>

<style scope>
.cell {
  min-height: 50px;
}

.cell-value {
  font-size: 2rem;
}

.locked-cell {
  background-color: rgb(212, 209, 209);
}
.selected-cell {
  background-color: rgb(159, 159, 169);
}

.error-cell {
  background-color: rgb(250, 250, 250);
}
</style>
