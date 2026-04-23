import Image from 'next/image';
import Link from 'next/link';

export type PostPhotoLinkProps = Readonly<{
  postId: string;
  title: string;
  tags?: string[];
}>;

export const PostPhotoLink = (props: PostPhotoLinkProps) => {
  return (
    <Link
      href={`/post/${props.postId}`}
      className="w-full h-auto cursor-pointer"
    >
      <Image
        className="rounded-2xl aspect-square"
        width={1000}
        height={1000}
        src={'https://placehold.co/1000x1000.png'}
        alt={`${props.title} thumbnail`}
      ></Image>
      {props.tags && (
        <div className="mt-2 px-1 flex gap-2 font-semibold text-sm text-zinc-600">
          {props.tags?.map((tag) => (
            <span key={tag}>{`#${tag}`}</span>
          ))}
        </div>
      )}
    </Link>
  );
};
