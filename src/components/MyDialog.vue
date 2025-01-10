<script setup lang="ts">
import { ref, watch } from 'vue';
interface Props {
  visible: boolean
}
interface Emits {
  (e: 'close'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const dialog = ref<HTMLDialogElement>();
watch(() => props.visible, (val) => {
  if (val) {
    dialog.value?.showModal();
  } else {
    dialog.value?.close();
  }
});
const close = () => {
  emits('close');
};
</script>

<template>
  <dialog
    ref="dialog"
    @close="() => close()"
  >
    <button @click="close">
      close
    </button>
    <slot />
  </dialog>
</template>

<style lang="scss" scoped>
</style>
