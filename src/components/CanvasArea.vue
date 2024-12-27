<script setup lang="ts">
import { useActiveStore, useFilesStore } from '@/stores/Default';
const { files } = useFilesStore();

const activeStore = useActiveStore();
import useCanvas from '@/composables/canvas';
const { onClickThumbnail } = useCanvas();

</script>

<template>
  <div class="canvas">
    <div class="wrap">
      <div class="Thumbnail">
        <div
          v-for="item, i in files"
          :key="i"
          class="item"
          :class="{ active: i == activeStore.active }"
          @click="() => onClickThumbnail(i)"
        >
          <img :src="item">
        </div>
      </div>
    </div>
    <div  class="wrap">
      <div class="Main">
        <div class="item">
          <img :src="files[activeStore.active]">
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.canvas {
  width: 100%;
  max-height: var(--canvas-h);

  display: grid;
  grid-template-columns: 100px auto;
}
.Main {
  .item {
    height: var(--canvas-h);
  }
}

.Thumbnail {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: scroll;
  height: var(--canvas-h);
  .item {
  border: 1px solid transparent;
  &.active {
    opacity: 0.5;
    border: 1px solid #000;
  }
}
}
</style>
