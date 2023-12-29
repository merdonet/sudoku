<template>
  <div class="d-flex flex-row" :class="cellData.lock ? 'locked-cell' : ''">
    <v-btn
      class="cell pa-0 ma-0 rounded-0"
      flat
      variant="outlined"
      :active="selectedCell"
      :ripple="false"
      size="small"
      @click="onClick"
      :color="selectedCell ? 'cyan-darken-1' : ''"
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
  }
});

const emit = defineEmits(['update:selected-item']);

const onClick = () => {
  // TODO: check if locked
  emit('update:selected-item', props.cellData);
};

const cellValue = computed(() => {
  if (props.cellData.userValue != 0) return props.cellData.userValue;
  if (props.cellData.lock) return props.cellData.val;

  return '';
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
</style>
