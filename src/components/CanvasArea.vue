<script setup lang="ts">
interface Emits {
  (e: 'remove', v: number): void;
}

const emits = defineEmits<Emits>();
import ContextMenu from 'primevue/contextmenu';
import {ref } from 'vue';

import { useActiveStore, useFilesStore } from '@/stores/Default';
const filesStore = useFilesStore();

const activeStore = useActiveStore();
import useCanvas from '@/composables/canvas';
const { onClickThumbnail } = useCanvas();

const menu = ref();
const selectedId = ref(0);
const items = ref([
  { command: () => {
    emits('remove', selectedId.value);
  }, label: '削除' }
]);

const onRightClick = (event: Event, id: number) => {
  selectedId.value = id;
  menu.value.show(event);
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
          @mouseover="() => onClickThumbnail(i)"
        >
          <img
            aria-haspopup="true"
            :src="item"
            @contextmenu="(e) => onRightClick(e, i)"
          >
        </div>
        <ContextMenu
          ref="menu"
          :model="items"
        />
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
