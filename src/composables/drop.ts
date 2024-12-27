import { useFilesStore } from '@/stores/Default';

interface Drop {
  onDrop: (e: DragEvent) => void;
  onChange: (e: Event) => void;
}

export const useDrop = (): Drop => {
  // ファイルの管理
  const filesStore = useFilesStore();

  // エリアに画像ドロップからの画像登録
  const onDrop = (e: DragEvent) => {
    if (e.dataTransfer) {
      const fileList = e.dataTransfer.files;
      upload(fileList);
    }
  };

  // inputからの画像登録
  const onChange = (e: Event) => {
    const fileList = (e.target as HTMLInputElement).files;
    if (fileList) {
      upload(fileList);
    }
  };

  // fileStoreに登録
  const upload = (fileList: FileList) => {
    const res: File[] = [...fileList].filter((v:File) => v.type.match(/image/)) as File[];
    filesStore.files.push(...getFiles(res));
  };

  // propされたファイルをURLに変換
  const getFiles = (files:File[]): string[] => files.map(file => URL.createObjectURL(file));

  return {
    onChange,
    onDrop
  };
};
