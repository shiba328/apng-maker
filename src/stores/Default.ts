import { defineStore } from 'pinia';
import { ref } from 'vue';

// drop or input された画像群
export const useFilesStore = defineStore('files', () => ({ files: ref([] as string[]) }));

// activeな画像のサムネイルindex番号
export const useActiveStore = defineStore('active', () => {
  // refを使ってリアクティブな状態を管理
  const active = ref(0);

  // 状態を変更するメソッド
  const setActive = (value: number) => {
    console.log('setActive', value);
    active.value = value;
  };

  return {
    active,
    setActive
  };
});
