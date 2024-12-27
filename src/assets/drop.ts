import { useFilesStore } from '@/stores/Default';

interface Drop {
  onDrop: (e: DragEvent) => void;
}

export const useDrop = (): Drop => {
  // ファイルの管理
  const { files } = useFilesStore();

  // エリアに画像をドロップしたときの処理
  const onDrop = (e: DragEvent) => {
    if (e.dataTransfer) {
      const tmpfiles = e.dataTransfer.files;
      const res: File[] = [...tmpfiles].filter((v:File) => v.type.match(/image/)) as File[];
      files.push(...getFiles(res));
    }
  };

  // propされたファイルをURLに変換
  const getFiles = (files:File[]): string[] => files.map(file => URL.createObjectURL(file));

  return {
    onDrop
  };
};
