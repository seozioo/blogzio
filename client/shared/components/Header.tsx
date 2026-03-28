import Image from 'next/image';
import Link from 'next/link';
import { SunIcon, UsersIcon } from '@phosphor-icons/react/ssr';

export const Header = () => {
  return (
    <div className="relative flex h-18 items-center justify-between px-5">
      <div className="flex items-center gap-4">
        <Link href={'/login'}>
          <Image
            className="rounded-full"
            width={40}
            height={40}
            src={'https://placehold.co/1000x1000.png'}
            alt={''}
          ></Image>
        </Link>
        <div className="flex items-center gap-1 text-zinc-400 font-semibold text-sm max-sm:hidden">
          <UsersIcon size={20} weight="bold" />
            <span>128</span> {/* 전체 방문자 수 */}
            <span>·</span>
            <span>10</span> {/* 오늘 방문자 수 */}
        </div>
      </div>
      <Link
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-black text-zinc-400"
        href={'/'}
      >
        BLOGZIO
      </Link>
      <div className="flex items-center justify-center w-8 h-8 text-zinc-400">
        <SunIcon size={24} weight="bold" />
      </div>
    </div>
  );
};
