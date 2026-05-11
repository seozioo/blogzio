'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { SunIcon, UsersIcon } from '@phosphor-icons/react';
import clsx from 'clsx';
import { useAuth } from '../hooks/use-auth';
import { useVisit } from '../hooks/use-visit';

export const Header = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { token, setToken } = useAuth();
  const clickCountRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isLoading: isLoadingVisit, today, total } = useVisit();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleProfileClick = () => {
    clickCountRef.current += 1;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (clickCountRef.current >= 5) {
      if (token) {
        setToken(null);
        alert('로그아웃되었습니다.');
      } else {
        router.push('/login');
      }
      clickCountRef.current = 0;
    } else {
      timeoutRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 500);
    }
  };


  return (
    <header className="relative flex h-18 items-center justify-between px-5">
      <div className="flex items-center gap-4">
        <div onClick={handleProfileClick} className="select-none">
          {isMounted ? (
            <Image
              className={clsx(
                'rounded-full',
                token && 'ring-2 ring-offset-2 ring-sky-500',
              )}
              width={40}
              height={40}
              src={'https://placehold.co/1000x1000.png'}
              alt={''}
            ></Image>
          ) : (
            <div className="h-10 w-10 rounded-full" aria-hidden="true" />
          )}
        </div>
      </div>
      <Link
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-black text-zinc-400"
        href={'/'}
      >
        BLOGZIO
      </Link>
      {/* <div className="flex items-center justify-center w-8 h-8 text-zinc-400">
        <SunIcon size={24} weight="bold" />
      </div> */}
      {isLoadingVisit || (
        <div className="flex items-center gap-1 text-zinc-400 font-semibold text-sm">
          <UsersIcon size={20} weight="bold" />
          <span>{total}</span> {/* 전체 방문자 수 */}
          <span>·</span>
          <span>{today}</span> {/* 오늘 방문자 수 */}
        </div>
      )}
    </header>
  );
};
