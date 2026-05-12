'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useApi } from '../../hooks/use-api';
import { newCategory } from '@/constants/category';
import { BaseContainer } from '../BaseContainer';
import { Button } from '../Button';
import { PlusIcon } from '@phosphor-icons/react';
import { CategoryCreateDialog } from './CategoryCreateDialog';
import { useAuth } from '@/shared/hooks/use-auth';
import { useActiveTabPosition } from './ActiveTabContext';

export type CategoryTabProps = Readonly<{
  overrideActiveCategory?: string;
}>;

export const CategoryTab = (props: CategoryTabProps) => {
  const pathname = usePathname();
  const savedPosition = useActiveTabPosition();
  const [hoverStyle, setHoverStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeStyle, setActiveStyle] = useState(() => {
    const prev = savedPosition?.current;
    if (prev) return { left: prev.left, width: prev.width, opacity: 1 };
    return { left: 0, width: 0, opacity: 0 };
  });
  const [shouldAnimate, setShouldAnimate] = useState(() => !!savedPosition?.current);
  const tabRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const { data, mutate } = useApi('/category');

  const categories = useMemo(() => {
    if (!data) return [newCategory];
    return [newCategory, ...data];
  }, [data]);

  const { isAdmin } = useAuth();

  const updateActiveStyle = useCallback(() => {
    const activeSlug = categories.find((item) => {
      if (props.overrideActiveCategory !== undefined) {
        return props.overrideActiveCategory === item.id;
      }
      return pathname === `/${item.slug}`;
    })?.slug;

    if (activeSlug) {
      const el = tabRefs.current.get(activeSlug);
      if (el) {
        const newPos = { left: el.offsetLeft, width: el.offsetWidth };
        setActiveStyle({ ...newPos, opacity: 1 });
        if (savedPosition) savedPosition.current = newPos;
        if (!shouldAnimate) {
          requestAnimationFrame(() => setShouldAnimate(true));
        }
      }
    } else {
      setActiveStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [pathname, categories, shouldAnimate, savedPosition]);

  useEffect(() => {
    updateActiveStyle();
  }, [updateActiveStyle]);

  return (
    <BaseContainer
      className="relative select-none"
      style={{ viewTransitionName: 'category-tab' }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-35% to-95% from-zinc-50 to-transparent z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-35% to-95% from-zinc-50 to-transparent z-20" />
      <div className="flex overflow-x-auto px-20 scrollbar-hide">
        <nav
          aria-label="category navigation"
          className="flex mx-auto items-end group"
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
            <div
              aria-hidden="true"
              className={clsx(
                'absolute bottom-0 h-10 bg-sky-500 rounded-t-2xl pointer-events-none z-10',
                shouldAnimate ? 'transition-all duration-300 ease-in-out' : 'transition-opacity',
              )}
              style={{
                left: `${activeStyle.left}px`,
                width: `${activeStyle.width}px`,
                opacity: activeStyle.opacity,
              }}
            >
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
            </div>
            {categories.map((item) => {
              const path = `/${item.slug}`;

              let isActive = pathname === path;

              if (props.overrideActiveCategory !== undefined) {
                isActive = props.overrideActiveCategory === item.id;
              }

              return (
                <Link
                  key={item.name}
                  href={path}
                  ref={(el) => {
                    if (el) tabRefs.current.set(item.slug!, el);
                    else tabRefs.current.delete(item.slug!);
                  }}
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
                      ? 'text-white z-20'
                      : 'text-zinc-600 hover:text-zinc-900 bg-transparent',
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            {isAdmin && (
              <>
                <Button
                  variant="flat"
                  size="icon"
                  onClick={() => setIsCreateDialogOpen(true)}
                >
                  <PlusIcon size={16} weight="bold" />
                </Button>
                <CategoryCreateDialog
                  open={isCreateDialogOpen}
                  onOpenChange={setIsCreateDialogOpen}
                  onCreate={() => mutate()}
                />
              </>
            )}
          </div>
        </nav>
      </div>
    </BaseContainer>
  );
};
