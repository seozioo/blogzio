import Image from "next/image";
import clsx from "clsx";

export type AlbumCoverProps = Readonly<{
  className?: string;
  coverUrl?: string;
  popDisc?: boolean;
  hiddenDisc?: boolean;
}>;

export const AlbumCover = (props: AlbumCoverProps) => {
  return (
    <div className={clsx('size-60 absolute', props.className)}>
      <div
        className={clsx(
          'absolute left-5 size-50 -z-10 rounded-full bg-[linear-gradient(to_bottom,#ffffff33_0%,transparent_45%),radial-gradient(circle,var(--color-zinc-900)_38%,var(--color-zinc-800)_40%)] flex items-center justify-center overflow-hidden transition-all duration-700',
          props.popDisc ? '-top-20' : 'top-5',
          props.hiddenDisc && 'hidden'
        )}
      >
        <div className="bg-sky-300 size-20 rounded-full z-10"></div>
        <svg
          className="absolute opacity-20 animate-[spin_8s_linear_infinite]"
          viewBox="0 0 240 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.5"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect
            width="240"
            height="240"
            fill="#000000"
            filter="url(#noiseFilter)"
          />
        </svg>
      </div>
      <Image
        className="rounded-2xl aspect-square shadow-lg"
        width={240}
        height={240}
        src={props.coverUrl ?? 'https://placehold.co/240x240.png'}
        alt={''}
      ></Image>
    </div>
  );
};
