<script setup lang="ts">
import { useDrop } from '@/assets/drop'
const { onDrop } = useDrop()
import { useFilesStore } from "@/stores/Default";
const { files } = useFilesStore();

import GHeader from "@/components/GHeader.vue";
import CanvasArea from "@/components/CanvasArea.vue";
import DropArea from "@/components/DropArea.vue";

</script>

<template>
<div>
  <GHeader />
  <main class="main"
    @dragover.prevent=""
    @dragleave.prevent=""
    @drop.prevent="(e) => onDrop(e)"
  >
    <CanvasArea 
    v-if="files.length > 0"/>
    <DropArea 
    v-if="files.length === 0"/>
    <FilesArea />
  </main>
</div>
</template>

<style scoped>
.main {
  width: 100dvw;
  height: 80dvh;
  position: relative;

  background-image: linear-gradient(45deg, #eee 25%, transparent 25%), linear-gradient(-45deg, #eee 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #eee 75%), linear-gradient(-45deg, transparent 75%, #eee 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

</style>
