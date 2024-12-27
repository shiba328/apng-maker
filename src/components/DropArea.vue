<script setup lang="ts">

interface Props {
}
interface Emits {
  (e: 'update', v: string): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
</script>

<template>
  <div class="droparea">
    image to drop
  </div>
</template>

<style lang="scss" scoped>
.droparea {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
}
</style>
