'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import { Button } from '../Button';

export type PaginationBarProps = Readonly<{
  currentPage: number;
  totalPages: number;
}>;

export const PaginationBar = ({
  currentPage,
  totalPages,
}: PaginationBarProps) => {
  if (totalPages < 1) return null;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const navigateTo = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages + 1, start + maxVisible);
  if (end - start < maxVisible) {
    start = Math.max(1, end - maxVisible);
  }

  const pages = Array.from({ length: end - start }, (_, i) => start + i);

  return (
    <div className="flex justify-center items-center">
      <Button
        variant="flat"
        size="icon"
        disabled={!hasPrev}
        onClick={() => navigateTo(currentPage - 1)}
      >
        <CaretLeftIcon size={16} weight="bold" />
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          variant="flat"
          size="icon"
          onClick={() => navigateTo(page)}
        >
          {page === currentPage ? (
            <span className="text-sky-500">{page}</span>
          ) : (
            page
          )}
        </Button>
      ))}
      <Button
        variant="flat"
        size="icon"
        disabled={!hasNext}
        onClick={() => navigateTo(currentPage + 1)}
      >
        <CaretRightIcon size={16} weight="bold" />
      </Button>
    </div>
  );
};
