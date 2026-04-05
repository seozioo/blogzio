import {
  GuestbookMessageBgColor,
  guestbookMessageBgColorVariants,
} from '@/constants/guestbook-message-color';
import { Toggle, ToggleGroup } from '@base-ui/react';
import { EraserIcon, PencilIcon } from '@phosphor-icons/react';
import clsx from 'clsx';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';

export type GuestbookCanvasProps = Readonly<{
  onChange?: (canvas: RefObject<HTMLCanvasElement | null>) => void;
  backgroundColor?: GuestbookMessageBgColor;
  children?: React.ReactNode;
}>;

export const GuestbookCanvas = (props: GuestbookCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [lineWidth, setLineWidth] = useState(1);
  const lineWidthRef = useRef(1);
  const [drawingMode, setDrawingMode] = useState<'PENCIL' | 'ERASER'>('PENCIL');
  const drawingModeRef = useRef<'PENCIL' | 'ERASER'>('PENCIL');

  const brushCursor = useMemo(() => {
    const radius = Math.max(1, lineWidth / 2);
    const size = Math.max(16, Math.ceil(radius * 2 + 8));
    const center = size / 2;
    const fill = 'transparent';
    const stroke = '#000000';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><circle cx="${center}" cy="${center}" r="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="1" /></svg>`;

    return `url("data:image/svg+xml,${encodeURIComponent(svg)}") ${center} ${center}, crosshair`;
  }, [drawingMode, lineWidth]);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.style.cursor = brushCursor;
  }, [brushCursor]);

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
      data[n + 3] = drawingModeRef.current === 'PENCIL' ? 255 : 0;
    };

    const drawBrush = (data: Uint8ClampedArray, x: number, y: number) => {
      const width = lineWidthRef.current;
      const start = -Math.floor(width / 2);
      const center = width % 2 === 0 ? -0.5 : 0;
      const radius = Math.max(0.5, width / 2 - 0.1);
      const radiusSquared = radius * radius;

      for (let offsetY = start; offsetY < start + width; offsetY += 1) {
        for (let offsetX = start; offsetX < start + width; offsetX += 1) {
          const dx = offsetX - center;
          const dy = offsetY - center;

          if (dx * dx + dy * dy <= radiusSquared) {
            setPixel(data, x + offsetX, y + offsetY);
          }
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

  const handleLineWidthChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nextWidth = Number(event.target.value);
    setLineWidth(nextWidth);
    lineWidthRef.current = nextWidth;
  };

  const handleDrawingModeChange = (nextMode: 'PENCIL' | 'ERASER') => {
    setDrawingMode(nextMode);
    drawingModeRef.current = nextMode;
  };

  return (
    <div className="flex flex-col gap-3 relative">
      <div className="absolute p-5 pointer-events-none">{props.children}</div>
      <canvas
        ref={canvasRef}
        className={guestbookMessageBgColorVariants({
          className:
            'inset-ring inset-ring-border pixelated w-75 h-75 rounded-2xl transition-colors',
          backgroundColor: props.backgroundColor ?? 'WHITE',
        })}
      />
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-3 text-sm">
          <input
            className="w-42"
            type="range"
            min={1}
            max={20}
            step={1}
            value={lineWidth}
            onChange={handleLineWidthChange}
          />
          <span>{lineWidth}px</span>
        </label>
        <ToggleGroup
          className="flex items-center"
          value={[drawingMode]}
          onValueChange={(value) => {
            handleDrawingModeChange(value[0] as 'PENCIL' | 'ERASER');
          }}
        >
          <Toggle
            className="size-8 rounded-lg text-zinc-600 data-pressed:bg-gray-200"
            aria-label="pencil"
            value="PENCIL"
          >
            <PencilIcon className="m-auto" size={20} weight="bold" />
          </Toggle>
          <Toggle
            className="size-8 rounded-lg text-zinc-600 data-pressed:bg-gray-200"
            aria-label="eraser"
            value="ERASER"
          >
            <EraserIcon className="m-auto" size={20} weight="bold" />
          </Toggle>
        </ToggleGroup>
      </div>
    </div>
  );
};
