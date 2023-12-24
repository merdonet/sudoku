<template>
  <div class="d-flex flex-row bg-surface-variant">
    <v-card v-click-outside="onClickOutside">
      <v-btn
        class="cell pa-0 ma-0"
        flat
        variant="outlined"
        :active="selected"
        rounded="false"
        :ripple="false"
        size="small"
        @click="onClick"
      >
        <span class="cell-value ma-0 pa-0">{{ cellData.item }}</span>
      </v-btn>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  cellData: {
    type: Object,
    default: () => {}
  }
})

const selected = ref(false)

const onClick = () => {
  selected.value = !selected.value
}

const onClickOutside = () => {
  selected.value = false
}
</script>

<style scope>
.cell {
  min-width: 40px;
  min-height: 50px;
}

.cell-value {
  font-size: 2rem;
}
</style>
