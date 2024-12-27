<script setup lang="ts">
import { useDrop } from '@/assets/drop';
import { onKeyArrow } from '@/assets/keyEvent';
const { onDrop } = useDrop();
import { useFilesStore } from '@/stores/Default';
const { files } = useFilesStore();

import CanvasArea from '@/components/CanvasArea.vue';
import DropArea from '@/components/DropArea.vue';
import GHeader from '@/components/GHeader.vue';

// keyのハンドラ
const handleKeyArrow = (event: KeyboardEvent) => {
  console.log(event.key);
  const directionMap: Record<string, 'prev' | 'next'> = {
    ArrowDown: 'next',
    ArrowLeft: 'prev',
    ArrowRight: 'next',
    ArrowUp: 'prev',
    Space: 'next'
  };

  const direction = directionMap[event.key];
  if (direction) {
    onKeyArrow(direction);
  }
};
</script>

<template>
  <div>
    <GHeader />
    <main
      class="main"
      tabindex="0"
      @dragleave.prevent=""
      @dragover.prevent=""
      @drop.prevent="(e) => onDrop(e)"
      @keypress.space="onKeyArrow('next')"
      @keyup="handleKeyArrow"
    >
      <CanvasArea
        v-if="files.length > 0"
      />
      <DropArea
        v-if="files.length === 0"
      />
    </main>
  </div>
</template>

<style scoped>
.main {
  width: 100svw;
  height: var(--canvas-h);
  position: relative;

  background-image: linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

</style>
