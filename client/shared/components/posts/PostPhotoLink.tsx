import Image from 'next/image';
import Link from 'next/link';
import { TagList } from './TagList';

export type PostPhotoLinkProps = Readonly<{
  postId: string;
  title: string;
  thumbnailUrl?: string;
  tags?: string[];
}>;

export const PostPhotoLink = (props: PostPhotoLinkProps) => {
  return (
    <div className="relative w-full h-auto">
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
  );
};
