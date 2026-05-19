import Image from 'next/image';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { FastAverageColor } from 'fast-average-color';

export type AlbumCoverProps = Readonly<{
  className?: string;
  coverUrl?: string;
  popDisc?: boolean;
  hiddenDisc?: boolean;
  onClick?: () => void;
}>;

const COLOR_SATURATION = 40;
const COLOR_LIGHTNESS = 80;

const rgbToHue = (red: number, green: number, blue: number) => {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  if (delta === 0) return 0;

  let hue = 0;

  if (max === r) {
    hue = ((g - b) / delta) % 6;
  } else if (max === g) {
    hue = (b - r) / delta + 2;
  } else {
    hue = (r - g) / delta + 4;
  }

  return Math.round(hue * 60 + (hue < 0 ? 360 : 0));
};

export const AlbumCover = (props: AlbumCoverProps) => {
  const coverRef = useRef<HTMLImageElement>(null);

  const [color, setColor] = useState<string>('');

  useEffect(() => {
    const fac = new FastAverageColor();
    const image = coverRef.current;

    if (!image) return;

    let ignore = false;

    fac.getColorAsync(image).then((color) => {
      if (ignore) return;

      const [red, green, blue] = color.value;
      const hue = rgbToHue(red, green, blue);

      setColor(`hsl(${hue} ${COLOR_SATURATION}% ${COLOR_LIGHTNESS}%)`);
    });

    return () => {
      ignore = true;
    };
  }, [props.coverUrl]);

  return (
    <div
      className={clsx(
        'size-60 absolute',
        props.className,
        !props.onClick && 'pointer-events-none',
      )}
    >
      <div
        className={clsx(
          'absolute left-5 size-50 -z-10 rounded-full bg-[linear-gradient(to_bottom,#ffffff33_0%,transparent_45%),radial-gradient(circle,var(--color-zinc-900)_38%,var(--color-zinc-800)_40%)] flex items-center justify-center overflow-hidden transition-all duration-700',
          props.popDisc ? '-top-20' : 'top-5',
          props.hiddenDisc && 'hidden',
        )}
      >
        <div
          className="size-20 rounded-full z-10"
          style={{ backgroundColor: color }}
        ></div>
        <Image
          className="absolute mix-blend-multiply animate-[spin_8s_linear_infinite] rounded-full"
          width={200}
          height={200}
          quality={100}
          src="/noise.png"
          alt={''}
        />
      </div>
      <Image
        ref={coverRef}
        className="rounded-2xl aspect-square shadow-lg object-cover bg-white"
        width={240}
        height={240}
        quality={100}
        preload
        sizes="240px"
        src={props.coverUrl ?? 'https://placehold.co/240x240.png'}
        alt={''}
        onClick={props.onClick}
      ></Image>
    </div>
  );
};
