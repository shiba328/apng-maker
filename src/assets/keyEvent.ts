import { useActiveStore, useFilesStore } from '@/stores/Default';

export const onKeyArrow = (direction: 'prev' | 'next') => {
  const { files } = useFilesStore();
  const activeStore = useActiveStore();
  const fileCount = files.length;

  // 現在のアクティブインデックス
  let newActiveIndex = activeStore.active;

  if (direction === 'prev') {
    newActiveIndex = newActiveIndex === 0 ? fileCount - 1 : newActiveIndex - 1;
  } else if (direction === 'next') {
    newActiveIndex = newActiveIndex >= fileCount - 1 ? 0 : newActiveIndex + 1;
  }

  activeStore.setActive(newActiveIndex);
};
