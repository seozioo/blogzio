'use client';

import { BaseContainer } from './BaseContainer';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { AlbumCover } from './AlbumCover';
import { components } from '@/types/schema';
import { AnimatePresence, motion } from 'motion/react';

type PlaylistItem = components['schemas']['PlaylistItemResponse'];

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

// Topic이 붙은 유튜브 등록 음원이 아닐 경우, 영상 제목을 그대로 표시합니다.
// Topic이 붙은 유튜브 등록 음원의 경우, 채널명 - 영상 제목으로 표시합니다.
const topicSuffix = ' - Topic';

// 높이는 calc(100svh-144px)로 고정한다.
export const MusicPlayer = ({ playlist }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedSong = playlist[selectedIndex];
  const rawChannelTitle = selectedSong?.channelTitle ?? '';
  const hasTopicSuffix = rawChannelTitle.endsWith(topicSuffix);
  const channelTitle = hasTopicSuffix
    ? rawChannelTitle.slice(0, -topicSuffix.length)
    : rawChannelTitle;
  const songTitle = selectedSong?.title ?? '';
  const playerTitle = hasTopicSuffix
    ? `${channelTitle} - ${songTitle}`
    : songTitle;

  const goPrev = () => {
    setSelectedIndex((i) => (i - 1 + playlist.length) % playlist.length);
  };
  const goNext = () => {
    setSelectedIndex((i) => (i + 1) % playlist.length);
  };

  useEffect(() => {
    if (playlist.length === 0) return;

    const timeout = setTimeout(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [selectedIndex, playlist.length]);

  return (
    <div className="overflow-hidden w-full select-none">
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
        <div className="absolute bottom-56 mx-auto h-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={playerTitle}
              className="text-sm text-zinc-600 select-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {playerTitle}
            </motion.p>
          </AnimatePresence>
        </div>
      </BaseContainer>
    </div>
  );
};
