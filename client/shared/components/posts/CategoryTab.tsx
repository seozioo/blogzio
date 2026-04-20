'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { useApi } from '../../hooks/use-api';
import { NEW_CATEGORY } from '@/constants/category';

export type CategoryTabProps = Readonly<{
  overrideActiveCategory?: string;
}>;

export const CategoryTab = (props: CategoryTabProps) => {
  const pathname = usePathname();
  const [hoverStyle, setHoverStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [isHovering, setIsHovering] = useState(false);

  const { data } = useApi('/category');

  const categories = useMemo(() => {
    if (!data) return [NEW_CATEGORY];
    return [NEW_CATEGORY, ...data];
  }, [data]);

  return (
    <nav
      aria-label="category navigation"
      className="flex justify-center items-end group"
    >
      <div
        className="relative flex gap-2"
        onMouseLeave={() => {
          setIsHovering(false);
          setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
        }}
      >
        <div
          aria-hidden="true"
          className={clsx(
            'absolute top-0.5 h-8 bg-zinc-200 rounded-2xl pointer-events-none',
            isHovering ? 'transition-all' : 'transition-opacity',
          )}
          style={{
            left: `${hoverStyle.left}px`,
            width: `${hoverStyle.width}px`,
            opacity: hoverStyle.opacity,
          }}
        />
        {categories.map((item) => {
          const path = `/${item.slug}`;

          let isActive = pathname === path;

          if (props.overrideActiveCategory) {
            isActive = props.overrideActiveCategory === item.slug;
          }

          return (
            <Link
              key={item.name}
              href={path}
              onMouseEnter={(e) => {
                setHoverStyle({
                  left: e.currentTarget.offsetLeft,
                  width: e.currentTarget.offsetWidth,
                  opacity: 1,
                });
                if (!isHovering) {
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      setIsHovering(true);
                    });
                  });
                }
              }}
              onFocus={(e) => {
                setHoverStyle({
                  left: e.currentTarget.offsetLeft,
                  width: e.currentTarget.offsetWidth,
                  opacity: 1,
                });
                if (!isHovering) {
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      setIsHovering(true);
                    });
                  });
                }
              }}
              aria-current={isActive ? 'page' : undefined}
              className={clsx(
                'relative flex items-center justify-center w-25 h-10 pb-1 text-sm font-semibold transition-colors',
                isActive
                  ? 'bg-sky-500 text-white z-10 rounded-t-2xl'
                  : 'text-zinc-600 hover:text-zinc-900 bg-transparent',
              )}
            >
              {isActive && (
                <>
                  <svg
                    aria-hidden="true"
                    className="absolute -left-4 bottom-0 w-4.25 h-4 text-sky-500 pointer-events-none"
                    viewBox="0 0 17 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M 17 16 H 0 A 16 16 0 0 0 16 0 H 17 V 16 Z" />
                  </svg>
                  <svg
                    aria-hidden="true"
                    className="absolute -right-4 bottom-0 w-4.25 h-4 text-sky-500 pointer-events-none"
                    viewBox="0 0 17 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M 0 16 V 0 H 1 A 16 16 0 0 0 17 16 H 0 Z" />
                  </svg>
                </>
              )}
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
