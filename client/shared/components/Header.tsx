import Image from 'next/image';
import { BaseContainer } from './BaseContainer';
import Link from 'next/link';

export const Header = () => {
  return (
    <BaseContainer className="relative h-18">
      <Link
        className="absolute left-0 top-1/2 -translate-y-1/2"
        href={'/login'}
      >
        <Image
          className="rounded-full"
          width={40}
          height={40}
          src={'https://placehold.co/1000x1000.png'}
          alt={''}
        ></Image>
      </Link>
      <Link
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-black text-zinc-400"
        href={'/'}
      >
        BLOGZIO
      </Link>
    </BaseContainer>
  );
};
