<script setup lang="ts">
interface Emits {
  (e: 'remove', v: number): void;
}

const emits = defineEmits<Emits>();
import {ref } from 'vue';

import { useActiveStore, useFilesStore } from '@/stores/Default';
const filesStore = useFilesStore();

const activeStore = useActiveStore();
import useCanvas from '@/composables/canvas';
const { onClickThumbnail } = useCanvas();

const longPressTimeout = ref(0); // 長押しタイマー

// 長押しを開始
const startPress = (index: number) => {
  longPressTimeout.value = setTimeout(() => {
    // 長押し完了時にアイテムを削除
    emits('remove', index);
  }, 800); // 長押しと判定する時間 (ms)
};

// 長押しをキャンセル
const cancelPress = () => {
  clearTimeout(longPressTimeout.value);
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
          @mousedown="startPress(i)"
          @mouseleave="cancelPress"
          @mouseover="onClickThumbnail(i)"
          @mouseup="cancelPress"
          @touchend="cancelPress"
          @touchstart="startPress(i)"
          @touchstart.prevent="onClickThumbnail(i)"
        >
          <img
            aria-haspopup="true"
            :src="item"
          >
        </div>
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
