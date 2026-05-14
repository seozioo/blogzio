import Link from 'next/link';

export type TagListProps = Readonly<{
  tags: string[];
  className?: string;
}>;

export const TagList = ({ tags, className }: TagListProps) => {
  if (tags.length === 0) return null;

  return (
    <div
      className={`flex gap-2 font-semibold text-sm text-zinc-400 ${className ?? ''}`}
    >
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/search?tag=${encodeURIComponent(tag)}`}
          className="relative z-10 hover:text-zinc-600 transition-colors"
        >
          {`#${tag}`}
        </Link>
      ))}
    </div>
  );
};
