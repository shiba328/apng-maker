<script setup lang="ts">

interface Props {
}
interface Emits {
  (e: 'onChange', v: Event): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
</script>

<template>
  <div class="droparea">
    <div>
      <div>
        image to drop
      </div>
      <div>
        <input
          id="select"
          accept="image/*"
          multiple
          type="file"
          @change="(e) => $emit('onChange', e)"
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.droparea {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  height: 100%;
  width: 100%;
}
</style>
