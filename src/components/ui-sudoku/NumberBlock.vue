<template>
  <template v-for="item in 9" :key="item">
    <v-btn
      class="cell"
      flat
      variant="outlined"
      rounded="false"
      :ripple="false"
      size="small"
      @click="onClick(item)"
    >
      <span class="cell-value ma-0 pa-0">{{ item }}</span>
    </v-btn>
  </template>
  <v-btn
    class="cell mx-1"
    flat
    variant="outlined"
    rounded="false"
    :ripple="false"
    size="small"
    @click="onClick(0)"
  >
    <span class="cell-value ma-0 pa-0">X</span>
  </v-btn>
  <v-btn
    class="cell"
    flat
    variant="outlined"
    rounded="false"
    :ripple="false"
    size="small"
    @click="onUndoClick"
  >
    <v-icon icon="mdi-undo"></v-icon>
  </v-btn>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:cell-value', 'update:undo']);

const onClick = (val: number) => {
  emit('update:cell-value', val);
};

const onUndoClick = () => emit('update:undo');
</script>

<style scoped>
.cell {
  min-width: 40px;
  min-height: 40px;
}

.cell-value {
  font-size: 1.5rem;
}
</style>
