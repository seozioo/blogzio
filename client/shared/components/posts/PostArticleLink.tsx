import Link from 'next/link';
import Image from 'next/image';
import { TagList } from './TagList';
import { cx } from 'class-variance-authority';
import { LockSimpleIcon } from '@phosphor-icons/react/ssr';

export type PostArticleLinkProps = Readonly<{
  postId: string;
  title: string;
  excerpt: string;
  postedAt: string;
  thumbnailUrl?: string;
  tags?: string[];
  isVisible?: boolean;
}>;

export const PostArticleLink = (props: PostArticleLinkProps) => {
  const formattedDate = new Date(props.postedAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="relative px-1 py-4">
      <Link
        href={`/post/${props.postId}`}
        className="absolute inset-0 z-0"
        aria-label={props.title}
      />
      <div className="h-15 flex justify-between items-start gap-2">
        <div className="min-w-0">
          <p className="text-xl font-semibold">
            {!props.isVisible && (
              <LockSimpleIcon
                className="inline-block mr-1 text-zinc-600"
                weight="fill"
                size={16}
              />
            )}
            <span
              className={cx({
                'opacity-30': !props.isVisible,
              })}
            >
              {props.title}
            </span>
          </p>
          <p
            className={cx(
              'text-sm text-zinc-600 mt-2 text-ellipsis overflow-hidden whitespace-nowrap',
              {
                'opacity-30': !props.isVisible,
              },
            )}
          >
            {props.excerpt}
          </p>
        </div>
        {props.thumbnailUrl && (
          <Image
            className={cx('rounded-2xl aspect-square shrink-0', {
              'opacity-30': !props.isVisible,
            })}
            width={60}
            height={60}
            src={props.thumbnailUrl}
            alt={`${props.title} thumbnail`}
          ></Image>
        )}
      </div>
      <div className="flex justify-between items-center mt-3 text-sm">
        <div
          className={cx({
            'opacity-30': !props.isVisible,
          })}
        >
          {props.tags && <TagList tags={props.tags} />}
        </div>
        <p
          className={cx('text-zinc-600', {
            'opacity-30': !props.isVisible,
          })}
        >
          {formattedDate}
        </p>
      </div>
    </div>
  );
};
