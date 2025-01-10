<script setup lang="ts">
import MyDialog from '@/components/MyDialog.vue';
import useframeCamera from '@/composables/frameCamera';
const {
  fcCanvas,
  fcVideo,
  fcPhoto,
  fcOptions,
  fcOptionsSettings,
  onClickTakeFC,
  onClickUpFC,
  isDialog
} = useframeCamera();

</script>

<template>
  <div>
    <div>
      フレームカメラ
      <button @click="onClickUpFC">
        起動
      </button>
    </div>
    <MyDialog
      :visible="isDialog"
      @close="() => isDialog = false"
    >
      <div>
        <div class="options">
          <label
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
          </label>
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
        <button @click="onClickTakeFC">
          Take photo
        </button>
      </div>
      <div>
        <canvas
          id="canvas"
          ref="fcCanvas"
        >
        </canvas>
      </div>
    </MyDialog>
  </div>
</template>

<style lang="scss" scoped>
#canvas {
  width: 100%;
}
.options {
  display: flex;
  gap: 8px;
}
input[type="number"] {
  width: 5em;
}
</style>
