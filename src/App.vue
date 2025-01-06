<script setup lang="ts">
import { useDrop } from '@/composables/drop';
import useframeCamera from '@/composables/frameCamera';
import { onKeyArrow } from '@/composables/keyEvent';

const {
  fcCanvas,
  fcVideo,
  fcPhoto,
  fcOptions,
  fcOptionsSettings,
  onClickTakeFC,
  onClickUpFC
} = useframeCamera();
const { onDrop, onChange, remove } = useDrop();
import { useFilesStore } from '@/stores/Default';
const filesStore = useFilesStore();

import CanvasArea from '@/components/CanvasArea.vue';
import DropArea from '@/components/DropArea.vue';
import GHeader from '@/components/GHeader.vue';

// keyのハンドラ
const handleKeyArrow = (event: KeyboardEvent) => {
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
    <div>
      <div>
        画像追加・撮影
        <input
          id="select"
          accept="image/*"
          multiple
          type="file"
          @change="(e) => onChange(e)"
        >
      </div>
      <div>
        フレームカメラ
        <div @click="onClickUpFC">
          起動
        </div>
      </div>
    </div>
    <div>
      <div class="options">
        <div
          v-for="setting, i in fcOptionsSettings"
          :key="i"
        >
          <div>
            {{ setting.label }}
          </div>
          <div>
            <div
              v-if="setting.type == 'switch'"
              class="switch"
            >
              <input
                v-model="fcOptions[setting.key]"
                switch
                type="checkbox"
              />
            </div>
            <input
              v-else
              v-model="fcOptions[setting.key]"
              :type="setting.type"
            >
          </div>
        </div>

      </div>
      <div
        class="camera"
        style="display: none"
      >
        <video
          id="video"
          ref="fcVideo"
          autoplay
          muted
          playsinline
        >
          Video stream not available.
        </video>
        <img
          ref="fcPhoto"
        >
      </div>
      <div @click="onClickTakeFC">
        Take photo
      </div>
    </div>
    <div>
      <canvas
        id="canvas"
        ref="fcCanvas"
      >
      </canvas>
    </div>
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
        v-if="filesStore.files.length > 0"
        @remove="(e) => remove(e)"
      />
      <DropArea
        v-if="filesStore.files.length === 0"
        @onChange="(e) => onChange(e)"
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
