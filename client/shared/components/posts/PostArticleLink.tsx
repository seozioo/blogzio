import Link from 'next/link';
import Image from 'next/image';

export type PostArticleLinkProps = Readonly<{
  postId: string;
  title: string;
  excerpt: string;
  postedAt: string;
  tags?: string[];
}>;

export const PostArticleLink = (props: PostArticleLinkProps) => {
  const formattedDate = new Date(props.postedAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Link href={`/post/${props.postId}`} className="px-1 py-4">
      <div className="h-15 flex justify-between items-start gap-2">
        <div className="min-w-0">
          <p className="text-xl font-semibold">{props.title}</p>
          <p className="text-sm text-zinc-600 mt-2 text-ellipsis overflow-hidden whitespace-nowrap">
            {props.excerpt}
          </p>
        </div>
        <Image
          className="rounded-2xl aspect-square shrink-0"
          width={60}
          height={60}
          src={'https://placehold.co/1000x1000.png'}
          alt={`${props.title} thumbnail`}
        ></Image>
      </div>
      <div className="flex justify-between items-center mt-3 text-sm">
        <div className="flex gap-2 font-semibold text-zinc-400">
          {props.tags?.map((tag) => (
            <span key={tag}>{`#${tag}`}</span>
          ))}
        </div>
        <p className="text-zinc-600">{formattedDate}</p>
      </div>
    </Link>
  );
};
