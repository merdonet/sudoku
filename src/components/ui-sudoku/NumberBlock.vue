<template>
  <template v-for="item in 9" :key="item">
    <v-btn class="cell" flat variant="outlined" rounded="false" :ripple="false" size="small">
      <span class="cell-value ma-0 pa-0">{{ item }}</span>
    </v-btn>
  </template>
  <v-btn class="cell" flat variant="outlined" rounded="false" :ripple="false" size="small">
    <span class="cell-value ma-0 pa-0">X</span>
  </v-btn>
</template>

<script setup lang="ts"></script>

<style scoped>
.cell {
  min-width: 40px;
  min-height: 40px;
}

.cell-value {
  font-size: 1.5rem;
}
</style>
