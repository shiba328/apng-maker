<script setup lang="ts">
import { useFilesStore } from '@/stores/Default';
const { files } = useFilesStore();

import 'vue3-carousel/dist/carousel.css';

import { computed, ref } from 'vue';
import { Carousel, Slide } from 'vue3-carousel';

const currentSlide = ref(0);

const slideTo = (nextSlide: number) => currentSlide.value = nextSlide;

const galleryConfig = {
  itemsToShow: 1,
  mouseDrag: false,
  slideEffect: 'fade',
  touchDrag: false,
  transition: 0,
  wrapAround: true
};

const thumbnailsConfig = {
  gap: 10,
  itemsToShow: 10,
  transition: 0
};

const images = ref([{}]);

computed(() => {
  images.value = files.map((url, i) => {
    return { id: i + 1, url };
  });
});

interface Props {
}
interface Emits {
  (e: 'update', v: string): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();
</script>
<template>
  <Carousel
    id="gallery"
    v-bind="galleryConfig"
    v-model="currentSlide"
  >
    <Slide
      v-for="file, i in files"
      :key="i"
    >
      <div class="carousel__item">
        <img
          alt="Gallery Image"
          class="gallery-image"
          :src="file"
        />
      </div>
    </Slide>
  </Carousel>

  <Carousel
    id="thumbnails"
    v-bind="thumbnailsConfig"
    v-model="currentSlide"
  >
    <Slide
      v-for="file, i in files"
      :key="i"
    >
      <div
        class="carousel__item"
        @click="slideTo(i)"
      >
        <img
          alt="Thumbnail Image"
          class="thumbnail-image"
          :src="file"
        />
      </div>
    </Slide>
  </Carousel>
</template>

<style lang="scss" scoped>
.gallery-image,
.thumbnail-image {
  width: 100%;
}
</style>
