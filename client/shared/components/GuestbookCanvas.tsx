import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { RefObject, useEffect, useRef, useState } from 'react';

const container = cva('div', {
  variants: {
    backgroundColor: {
      WHITE: 'from-zinc-100/85 to-white',
      PINK: 'from-pink-100 to-pink-50',
      YELLOW: 'from-yellow-100 to-yellow-50',
      LIME: 'from-lime-100 to-lime-50',
      SKY: 'from-sky-100 to-sky-50',
    },
  },
});

export type GuestbookCanvasProps = Readonly<
  {
    onChange?: (canvas: RefObject<HTMLCanvasElement | null>) => void;
  } & VariantProps<typeof container>
>;

export const GuestbookCanvas = (props: GuestbookCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lineWidth, setLineWidth] = useState(1);
  const lineWidthRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 300;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let imageData: ImageData | null = null;

    const setPixel = (data: Uint8ClampedArray, x: number, y: number) => {
      if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return;

      const n = (y * canvas.width + x) * 4;
      data[n] = 0;
      data[n + 1] = 0;
      data[n + 2] = 0;
      data[n + 3] = 255;
    };

    const drawBrush = (data: Uint8ClampedArray, x: number, y: number) => {
      const width = lineWidthRef.current;
      const start = -Math.floor(width / 2);

      for (let offsetY = start; offsetY < start + width; offsetY += 1) {
        for (let offsetX = start; offsetX < start + width; offsetX += 1) {
          setPixel(data, x + offsetX, y + offsetY);
        }
      }
    };

    // Refer to: http://rosettacode.org/wiki/Bitmap/Bresenham's_line_algorithm#JavaScript
    const bline = (
      data: Uint8ClampedArray,
      x0: number,
      y0: number,
      x1: number,
      y1: number,
    ) => {
      let dx = Math.abs(x1 - x0);
      const sx = x0 < x1 ? 1 : -1;
      let dy = Math.abs(y1 - y0);
      const sy = y0 < y1 ? 1 : -1;
      let err = (dx > dy ? dx : -dy) / 2;

      while (true) {
        drawBrush(data, x0, y0);
        if (x0 === x1 && y0 === y1) break;
        const e2 = err;
        if (e2 > -dx) {
          err -= dy;
          x0 += sx;
        }
        if (e2 < dy) {
          err += dx;
          y0 += sy;
        }
      }
    };

    const startDrawing = (e: MouseEvent) => {
      isDrawing = true;
      lastX = Math.round(e.offsetX);
      lastY = Math.round(e.offsetY);
      imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      drawBrush(imageData.data, lastX, lastY);
      ctx.putImageData(imageData, 0, 0);
    };

    const draw = (e: MouseEvent) => {
      if (!isDrawing || !imageData) return;

      const x = Math.round(e.offsetX);
      const y = Math.round(e.offsetY);

      bline(imageData.data, lastX, lastY, x, y);
      lastX = x;
      lastY = y;
      ctx.putImageData(imageData, 0, 0);
    };

    const stopDrawing = () => {
      isDrawing = false;
      imageData = null;

      props.onChange?.(canvasRef);
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
    };
  }, []);

  const handleLineWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextWidth = Number(event.target.value);
    setLineWidth(nextWidth);
    lineWidthRef.current = nextWidth;
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-3 text-sm">
        <span>굵기</span>
        <input
          type="range"
          min={1}
          max={12}
          step={1}
          value={lineWidth}
          onChange={handleLineWidthChange}
        />
        <span>{lineWidth}px</span>
      </label>
      <canvas
        ref={canvasRef}
        className={clsx(
          'inset-ring inset-ring-border bg-linear-to-b pixelated',
          container({ backgroundColor: props.backgroundColor ?? 'WHITE' }),
        )}
      />
    </div>
  );
};
