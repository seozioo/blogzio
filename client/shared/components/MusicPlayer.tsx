'use client';

import { BaseContainer } from './BaseContainer';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { AlbumCover } from './AlbumCover';

type PlaylistItem = {
  videoId: string;
  thumbnailUrl: string;
  videoUrl: string;
};

type Props = {
  playlist: PlaylistItem[];
};


const positionClassNames = [
  '-translate-x-200 -translate-z-120 opacity-0',
  '-translate-x-160 -translate-z-80 opacity-50 z-10',
  '-translate-x-76 -translate-z-30 z-20',
  'translate-x-0 translate-z-0 data-show-disc z-30', // 선택된 앨범 커버
  'translate-x-76 -translate-z-30 z-20',
  'translate-x-160 -translate-z-80 opacity-50 z-10',
  'translate-x-200 -translate-z-120 opacity-0',
];


// 높이는 calc(100svh-144px)로 고정한다.
export const MusicPlayer = ({ playlist }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const goPrev = () =>
    setSelectedIndex((i) => (i - 1 + playlist.length) % playlist.length);
  const goNext = () =>
    setSelectedIndex((i) => (i + 1) % playlist.length);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedIndex, playlist.length]);

  return (
    <div className="overflow-hidden w-full">
      <BaseContainer className="relative flex flex-col justify-center items-center h-[calc(100svh-144px)] transform-flat perspective-normal">
        {playlist.map((song, index) => {
          const len = playlist.length;
          let offset = index - selectedIndex;
          if (offset > Math.floor(len / 2)) offset -= len;
          if (offset < -Math.floor(len / 2)) offset += len;

          const posIndex = offset + 3;

          return (
            <AlbumCover
              key={song.videoId}
              className={clsx(
                'transition-all duration-500',
                positionClassNames[posIndex] || 'hidden',
              )}
              popDisc={index === selectedIndex}
              hiddenDisc={Math.abs(offset) > 1}
              coverUrl={song.thumbnailUrl}
              onClick={
                index === selectedIndex
                  ? () => window.open(song.videoUrl)
                  : offset < 0
                    ? goPrev
                    : goNext
              }
            />
          );
        })}
      </BaseContainer>
    </div>
  );
};
