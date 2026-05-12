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
  '-translate-x-160 -translate-z-80 opacity-50',
  '-translate-x-76 -translate-z-30',
  'translate-x-0 translate-z-0 data-show-disc', // 선택된 앨범 커버
  'translate-x-76 -translate-z-30',
  'translate-x-160 -translate-z-80 opacity-50',
  'translate-x-200 -translate-z-120 opacity-0',
];


const dummyPlaylist = [
  {
    id: 1,
    title: 'Song 1',
  },
  {
    id: 2,
    title: 'Song 2',
  },
  {
    id: 3,
    title: 'Song 3',
  },
  {
    id: 4,
    title: 'Song 4',
  },
  {
    id: 5,
    title: 'Song 5',
  },
  {
    id: 6,
    title: 'Song 6',
  },
  {
    id: 7,
    title: 'Song 7',
  },
  {
    id: 8,
    title: 'Song 8',
  },
  {
    id: 9,
    title: 'Song 9',
  },
  {
    id: 10,
    title: 'Song 10',
  },
];

// 높이는 calc(100svh-144px)로 고정한다.
export const MusicPlayer = ({ playlist }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden w-full">
      <BaseContainer className="flex flex-col justify-center items-center h-[calc(100svh-144px)] transform-3d perspective-normal">
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
            />
          );
        })}
      </BaseContainer>
    </div>
  );
};
