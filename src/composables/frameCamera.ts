import { reactive, ref } from 'vue';

import { useFilesStore } from '@/stores/Default';

// 型定義
interface FcOptions {
  circleDivisions: number;
  gridDivisions: number;
  showCircles: boolean;
  showDiagonals: boolean;
  showGrid: boolean;
  showGridNumbers: boolean;
  showOptions: boolean;
  showSquare: boolean;
  [key: string]: boolean | number; // 文字列インデックスを追加
}

// fcOptionsの型を指定

export default () => {
  // ファイルの管理
  const filesStore = useFilesStore();
  const width = 1200; // 動画の横幅
  let height = 0; // 動画の高さ（入力ストリームに基づいて計算）
  let streaming = false; // ストリーミング状態を管理

  const fcVideo = ref();
  const fcCanvas = ref();
  const fcPhoto = ref();

  // 描画オプション
  const fcOptions: FcOptions = reactive({
    circleDivisions: 3,
    gridDivisions: 6,
    showCircles: true,
    showDiagonals: true,
    showGrid: true,
    showGridNumbers: true,
    showOptions: true,
    showSquare: true
  });

  const fcOptionsSettings = [
    { key: 'circleDivisions', label: '円の分割数', type: 'number' },
    { key: 'gridDivisions', label: 'グリッドの分割数', type: 'number' },
    { key: 'showCircles', label: '円の表示', type: 'switch' },
    { key: 'showDiagonals', label: '対角線の表示', type: 'switch' },
    { key: 'showGrid', label: 'グリッドの表示', type: 'switch' },
    { key: 'showSquare', label: '正方形の表示', type: 'switch' },
    { key: 'showGridNumbers', label: 'グリッド番号の表示', type: 'switch' },
    { key: 'showOptions', label: '設定の表示', type: 'switch' }
  ];

  const onClickUpFC = () => {
    console.log('onClickUpFC');
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((stream) => {
        fcVideo.value.srcObject = stream;
        fcVideo.value.play();
      })
      .catch((error) => {
        console.error(`An error occurred: ${error}`);
      });

    fcVideo.value.addEventListener(
      'canplay',
      () => {
        if (!streaming) {
          height = fcVideo.value.videoHeight / (fcVideo.value.videoWidth / width);
          if (isNaN(height)) height = width / (4 / 3);

          fcVideo.value.setAttribute('width', width);
          fcVideo.value.setAttribute('height', height);
          fcCanvas.value.setAttribute('width', width);
          fcCanvas.value.setAttribute('height', height);
          streaming = true;

          drawVideoFrame();
        }
      },
      false
    );
  };

  const drawOptions = (context: CanvasRenderingContext2D) => {
    if (fcOptions.showOptions) {
      const x = 10;
      const y = 50;
      context.fillStyle = 'black';
      context.font = '12px Arial';
      context.textAlign = 'left';
      context.textBaseline = 'top';

      for (const [index, option] of fcOptionsSettings.entries()) {
        const label = `${option.label}: ${fcOptions[option.key]}`;
        context.fillText(label, x, y + index * 16);
      }
    }
  };

  const drawSquare = (context: CanvasRenderingContext2D, size: number) => {
    context.strokeStyle = 'red';
    context.lineWidth = 1;
    context.strokeRect((width - size) / 2, (height - size) / 2, size, size);
  };

  const drawDiagonals = (context: CanvasRenderingContext2D, size: number) => {
    context.strokeStyle = 'blue';
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo((width - size) / 2, (height - size) / 2);
    context.lineTo((width + size) / 2, (height + size) / 2);
    context.moveTo((width - size) / 2, (height + size) / 2);
    context.lineTo((width + size) / 2, (height - size) / 2);
    context.stroke();
  };

  const drawGrid = (context: CanvasRenderingContext2D, size: number, divisions: number) => {
    context.strokeStyle = 'green';
    context.lineWidth = 1;
    const cellSize = size / divisions;

    for (let i = 0; i <= divisions; i++) {
      const offset = i * cellSize;
      context.beginPath();
      context.moveTo((width - size) / 2 + offset, (height - size) / 2);
      context.lineTo((width - size) / 2 + offset, (height + size) / 2);
      context.stroke();
      context.beginPath();
      context.moveTo((width - size) / 2, (height - size) / 2 + offset);
      context.lineTo((width + size) / 2, (height - size) / 2 + offset);
      context.stroke();
    }

    if (fcOptions.showGridNumbers) {
      context.fillStyle = 'black';
      context.font = `${Math.min(cellSize / 3, 12)}px Arial`;
      context.textAlign = 'left';
      context.textBaseline = 'top';

      for (let row = 0; row < divisions; row++) {
        for (let col = 0; col < divisions; col++) {
          const x = (width - size) / 2 + col * cellSize;
          const y = (height - size) / 2 + row * cellSize;
          const label = `${String.fromCharCode(65 + row)}${col + 1}`;
          context.fillText(label, x + 2, y + 2);
        }
      }
    }
  };

  const drawCircles = (context: CanvasRenderingContext2D, size: number, divisions: number) => {
    context.strokeStyle = 'purple';
    context.lineWidth = 1;
    for (let i = 1; i <= divisions; i++) {
      context.beginPath();
      context.arc(width / 2, height / 2, size / 2 / divisions * i, 0, Math.PI * 2);
      context.stroke();
    }
  };

  const drawVideoFrame = () => {
    const context = fcCanvas.value.getContext('2d');
    if (streaming) {
      context.drawImage(fcVideo.value, 0, 0, width, height);

      const size = Math.min(width, height);

      if (fcOptions.showSquare) drawSquare(context, size);
      if (fcOptions.showDiagonals) drawDiagonals(context, size);
      if (fcOptions.showGrid) drawGrid(context, size, fcOptions.gridDivisions);
      if (fcOptions.showCircles) drawCircles(context, size, fcOptions.circleDivisions);

      drawOptions(context);

      requestAnimationFrame(drawVideoFrame);
    }
  };

  const onClickTakeFC = () => {
    console.log('onClickTakeFC');
    takepicture();
  };

  function clearphoto() {
    const context = fcCanvas.value.getContext('2d');
    context.fillStyle = '#AAA';
    context.fillRect(0, 0, fcCanvas.value.width, fcCanvas.value.height);

    const data = fcCanvas.value.toDataURL('image/png');
    fcPhoto.value.setAttribute('src', data);
  }

  function takepicture() {
    const context = fcCanvas.value.getContext('2d');
    if (width && height) {
      // 1. 描写前の画像（動画フレームのみ）
      fcCanvas.value.width = width;
      fcCanvas.value.height = height;
      context.drawImage(fcVideo.value, 0, 0, width, height); // 動画フレームだけ描画

      // 描写前の画像をデータURLとして取得
      const beforeDataURL = fcCanvas.value.toDataURL('image/png');

      // 描写前の画像をBlobに変換
      const beforeBlob = dataURLToBlob(beforeDataURL);
      const beforeFile = new File([beforeBlob], 'before_canvas_image.png', { type: 'image/png' });

      // 描写後の画像（線やオプションが描かれた後）
      // 最大サイズに基づいた描画
      const size = Math.min(width, height);

      if (fcOptions.showSquare) drawSquare(context, size);
      if (fcOptions.showDiagonals) drawDiagonals(context, size);
      if (fcOptions.showGrid) drawGrid(context, size, fcOptions.gridDivisions);
      if (fcOptions.showCircles) drawCircles(context, size, fcOptions.circleDivisions);

      // fcOptionsの描画
      drawOptions(context);

      // 描写後の画像をデータURLとして取得
      const afterDataURL = fcCanvas.value.toDataURL('image/png');

      // 描写後の画像をBlobに変換
      const afterBlob = dataURLToBlob(afterDataURL);
      const afterFile = new File([afterBlob], 'after_canvas_image.png', { type: 'image/png' });
      filesStore.setFiles(getFiles([beforeFile, afterFile]));

    }
  }

  // propされたファイルをURLに変換
  const getFiles = (files:File[]): string[] => files.map(file => URL.createObjectURL(file));

  // base64をBlobに変換する関数
  function dataURLToBlob(dataURL: string) {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];

    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  }

  return { fcCanvas, fcOptions, fcOptionsSettings, fcPhoto, fcVideo, onClickTakeFC, onClickUpFC };
};
