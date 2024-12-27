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
  <div>
    APNG Maker
  </div>
</template>

<style lang="scss" scoped>
</style>
