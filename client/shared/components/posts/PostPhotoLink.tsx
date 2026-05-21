import Image from 'next/image';
import Link from 'next/link';
import { TagList } from './TagList';
import { cx } from 'class-variance-authority';
import { LockSimpleIcon } from '@phosphor-icons/react/ssr';

export type PostPhotoLinkProps = Readonly<{
  postId: string;
  title: string;
  thumbnailUrl?: string;
  tags?: string[];
  isVisible?: boolean;
}>;

export const PostPhotoLink = (props: PostPhotoLinkProps) => {
  return (
    <div className="relative">
      {!props.isVisible && (
        <LockSimpleIcon
          className="absolute top-3 left-3 z-10 text-zinc-600"
          weight="fill"
        />
      )}
      <div
        className={cx('relative w-full h-auto', {
          'opacity-30': !props.isVisible,
        })}
      >
        <Link
          href={`/post/${props.postId}`}
          className="absolute inset-0 z-0"
          aria-label={props.title}
        />

        <Image
          className="rounded-2xl aspect-square object-cover"
          width={1000}
          height={1000}
          src={props.thumbnailUrl ?? 'https://placehold.co/1000x1000.png'}
          alt={`${props.title} thumbnail`}
        ></Image>
        {props.tags && <TagList tags={props.tags} className="mt-2 px-1" />}
      </div>
    </div>
  );
};
