// 仕様書: Signup

import { useActiveStore } from '@/stores/Default';

interface Canvas {
  onClickThumbnail: (i: number) => void;
}

export default (): Canvas => {

  const activeStore = useActiveStore(); // ストアをインポート

  const onClickThumbnail = (i: number): void => {
    console.log('onClickThumbnail');
    activeStore.setActive(i);
  };
  return {
    onClickThumbnail
  };
};
