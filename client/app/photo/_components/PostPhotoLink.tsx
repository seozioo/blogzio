import Image from 'next/image';

export type PostPhotoLinkProps = Readonly<{
  tags?: string[];
}>;

export const PostPhotoLink = (props: PostPhotoLinkProps) => {
  return (
    <div className="relative aspect-square w-full h-auto">
      <Image
        className="rounded-2xl"
        width={1000}
        height={1000}
        src={'https://placehold.co/1000x1000.png'}
        alt={''}
      ></Image>
      <div>
        {props.tags?.map((tag) => (
          <span key={tag}>{`#${tag}`}</span>
        ))}
      </div>
    </div>
  );
};
