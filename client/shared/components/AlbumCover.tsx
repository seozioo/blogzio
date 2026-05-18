import Image from 'next/image';
import clsx from 'clsx';

export type AlbumCoverProps = Readonly<{
  className?: string;
  coverUrl?: string;
  popDisc?: boolean;
  hiddenDisc?: boolean;
  onClick?: () => void;
}>;

export const AlbumCover = (props: AlbumCoverProps) => {
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
        <div className="bg-sky-300 size-20 rounded-full z-10"></div>
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
        className="rounded-2xl aspect-square shadow-lg object-cover bg-white"
        width={240}
        height={240}
        quality={100}
        unoptimized
        sizes="240px"
        src={props.coverUrl ?? 'https://placehold.co/240x240.png'}
        alt={''}
        onClick={props.onClick}
      ></Image>
    </div>
  );
};
