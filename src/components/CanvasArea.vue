<script setup lang="ts">
import { ref } from 'vue';

interface Emits {
  (e: 'remove', v: number): void;
}

const emits = defineEmits<Emits>();

import { useActiveStore, useFilesStore } from '@/stores/Default';
const filesStore = useFilesStore();

const activeStore = useActiveStore();
import useCanvas from '@/composables/canvas';
const { onClickThumbnail } = useCanvas();

const draggedIndex = ref();

// 削除
const dropTrash = () => {
  // 長押し完了時にアイテムを削除
  emits('remove', draggedIndex.value);
};

</script>

<template>
  <div class="canvas">
    <div class="wrap">
      <div class="Thumbnail">
        <div
          v-for="item, i in filesStore.files"
          :key="i"
          class="item"
          :class="{ active: i == activeStore.active }"
          draggable
          @dragstart="() => draggedIndex = i"
          @mouseover="onClickThumbnail(i)"
          @touchstart.prevent="onClickThumbnail(i)"
        >
          <img
            :src="item"
          >
        </div>
      </div>
      <div
        class="trash"
        @drop.stop="dropTrash"
      >
        trash
      </div>
    </div>
    <div  class="wrap">
      <div class="Main">
        <div class="item">
          <img :src="filesStore.files[activeStore.active]">
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>
.canvas {
  width: 100%;
  max-height: var(--canvas-h);
  display: flex;
  .wrap {
    height: var(--canvas-h);
  }
  .wrap:first-child {
    flex-basis: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
.trash {
  height: 100px ;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eee;
}
.Thumbnail {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: scroll;
  .item {
  border: 1px solid transparent;
  &.active {
    opacity: 0.5;
    border: 1px solid #000;
  }
}
}
.Main {
  .item {
    height: var(--canvas-h);
  }
}

</style>
