<script setup lang="ts">
import { useFilesStore } from "@/stores/Default";
const { files } = useFilesStore();

import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide } from 'vue3-carousel';
import { computed, ref } from 'vue';

const currentSlide = ref(0);

const slideTo = (nextSlide) => (currentSlide.value = nextSlide);

const galleryConfig = {
  itemsToShow: 1,
  wrapAround: true,
  transition: 0,
  slideEffect: 'fade',
  mouseDrag: false,
  touchDrag: false,
};

const thumbnailsConfig = {
  itemsToShow: 10,
  transition: 0,
  gap: 10,
};

const images = ref([{}])

computed(() => {
  images.value = files.map((url, i) => {
  return { id: i + 1, url }
})
})
 

interface Props {
}
interface Emits {
  (e: 'update', v: string): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
</script>
<template>
  <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide">
    <Slide v-for="file, i in files" :key="i">
      <div class="carousel__item">
        <img :src="file" alt="Gallery Image" class="gallery-image" />
      </div>
    </Slide>
  </Carousel>

  <Carousel id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide">
    <Slide v-for="file, i in files" :key="i">
      <div class="carousel__item" @click="slideTo(i)">
        <img :src="file" alt="Thumbnail Image" class="thumbnail-image" />
      </div>
    </Slide>
  </Carousel>
</template>

<style lang="scss" scoped>
.thumbnail-image {
  width: 100%;
}
</style>
