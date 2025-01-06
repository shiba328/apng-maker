<script setup lang="ts">

import useframeCamera from '@/composables/frameCamera';
const {
  fcCanvas,
  fcVideo,
  fcPhoto,
  fcOptions,
  fcOptionsSettings,
  onClickTakeFC,
  onClickUpFC
} = useframeCamera();

</script>

<template>
  <div>
    <div>
      フレームカメラ
      <div @click="onClickUpFC">
        起動
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
  </div>
</template>

<style lang="scss" scoped>
</style>
