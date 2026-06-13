'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useApi } from '../../hooks/use-api';
import { newCategory } from '@/constants/category';
import { BaseContainer } from '../BaseContainer';
import { Button } from '../Button';
import { PlusIcon, XIcon } from '@phosphor-icons/react';
import { CategoryCreateDialog } from './CategoryCreateDialog';
import { useAuth } from '@/shared/hooks/use-auth';
import { useIsMount } from '@/shared/hooks/use-is-mount';
import { useActiveTabPosition } from './ActiveTabContext';
import { BaseContextMenu } from '../BaseContextMenu';
import { apiClient } from '@/constants/api-client';
import { components } from '@/types/schema';
import { CategoryEditDialog } from './CategoryEditDialog';
import { CategoryDeleteDialog } from './CategoryDeleteDialog';

type Category = components['schemas']['CategoryResponse'];

export type CategoryTabProps = Readonly<{
  overrideActiveCategory?: string;
}>;

export const CategoryTab = (props: CategoryTabProps) => {
  const pathname = usePathname();
  const savedPositionRef = useActiveTabPosition();
  const [hoverStyle, setHoverStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [isHovering, setIsHovering] = useState(false);
  const isMounted = useIsMount();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeStyle, setActiveStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const tabRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null,
  );

  const { data, mutate } = useApi('/category');
  const categoryData = useMemo(() => data?.categories ?? [], [data]);

  const categories = useMemo(() => {
    return [newCategory, ...categoryData];
  }, [categoryData]);

  const { isAdmin } = useAuth();

  const handleMoveCategory = useCallback(
    async (categoryId: string | undefined, move: number) => {
      if (!categoryId || categoryId === newCategory.id || move === 0) return;

      const { data: updatedCategories, error } = await apiClient.PATCH(
        '/category/{categoryId}/order',
        {
          params: { path: { categoryId } },
          body: { move },
        },
      );

      if (error) {
        alert(error);
        return;
      }

      if (updatedCategories) {
        await mutate(updatedCategories, { revalidate: false });
      } else {
        await mutate();
      }
    },
    [mutate],
  );

  const handleDeleteCategory = async (
    e: React.MouseEvent,
    categoryId: string,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    await apiClient.DELETE('/category/{categoryId}', {
      params: { path: { categoryId } },
    });
    mutate();
  };

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
        if (savedPositionRef) savedPositionRef.current = newPos;
        if (!shouldAnimate) {
          requestAnimationFrame(() => setShouldAnimate(true));
        }
      }
    } else {
      setActiveStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [
    pathname,
    categories,
    props.overrideActiveCategory,
    shouldAnimate,
    savedPositionRef,
  ]);

  useEffect(() => {
    updateActiveStyle();
  }, [updateActiveStyle]);

  return (
    <BaseContainer
      className="relative select-none"
      style={{ viewTransitionName: 'category-tab' }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-35% to-95% from-zinc-50 to-zinc-50/1 z-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-35% to-95% from-zinc-50 to-zinc-50/1 z-20" />
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
                shouldAnimate
                  ? 'transition-all duration-300 ease-in-out'
                  : 'transition-opacity',
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
              const categoryIndex = categoryData.findIndex(
                (category) => category.id === item.id,
              );
              const shouldOpenContextMenu =
                isAdmin && item.id !== newCategory.id && categoryIndex !== -1;
              const moveToFront = -categoryIndex;
              const moveToBack = categoryData.length - 1 - categoryIndex;

              let isActive = pathname === path;

              if (props.overrideActiveCategory !== undefined) {
                isActive = props.overrideActiveCategory === item.id;
              }

              const trigger = (
                <Link
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
                    'group/link relative flex items-center justify-center w-25 h-10 pb-1 text-sm font-semibold transition-colors',
                    isActive
                      ? 'text-white z-20'
                      : 'text-zinc-600 hover:text-zinc-900 bg-transparent',
                  )}
                >
                  {item.name}
                  {isAdmin && item.id !== '__NEW__' && isActive && (
                    <span className="overflow-hidden w-0 group-hover/link:w-6 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out flex items-center shrink-0">
                      <button
                        className="pl-1 shrink-0"
                        onClick={(e) => handleDeleteCategory(e, item.id!)}
                      >
                        <span className="flex items-center justify-center bg-red-500 rounded-full p-0.5">
                          <XIcon
                            size={10}
                            weight="bold"
                            className="text-white"
                          />
                        </span>
                      </button>
                    </span>
                  )}
                </Link>
              );

              if (!shouldOpenContextMenu) {
                return <div key={item.name}>{trigger}</div>;
              }

              return (
                <BaseContextMenu key={item.name} trigger={trigger}>
                  <BaseContextMenu.Item
                    disabled={moveToFront === 0}
                    onClick={() =>
                      void handleMoveCategory(item.id, moveToFront)
                    }
                  >
                    맨앞으로
                  </BaseContextMenu.Item>
                  <BaseContextMenu.Item
                    disabled={categoryIndex === 0}
                    onClick={() => void handleMoveCategory(item.id, -1)}
                  >
                    앞으로
                  </BaseContextMenu.Item>
                  <BaseContextMenu.Item
                    disabled={categoryIndex === categoryData.length - 1}
                    onClick={() => void handleMoveCategory(item.id, 1)}
                  >
                    뒤로
                  </BaseContextMenu.Item>
                  <BaseContextMenu.Item
                    disabled={moveToBack === 0}
                    onClick={() => void handleMoveCategory(item.id, moveToBack)}
                  >
                    맨뒤로
                  </BaseContextMenu.Item>
                  <BaseContextMenu.Separator />
                  <BaseContextMenu.Item
                    onClick={() => setEditingCategory(item)}
                  >
                    수정
                  </BaseContextMenu.Item>
                  <BaseContextMenu.Item
                    onClick={() => setDeletingCategory(item)}
                  >
                    삭제
                  </BaseContextMenu.Item>
                </BaseContextMenu>
              );
            })}
            {isMounted && isAdmin && (
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
            <CategoryEditDialog
              category={editingCategory}
              open={editingCategory !== null}
              onOpenChange={(open) => {
                if (!open) setEditingCategory(null);
              }}
              onEdit={() => mutate()}
            />
            <CategoryDeleteDialog
              category={deletingCategory}
              open={deletingCategory !== null}
              onOpenChange={(open) => {
                if (!open) setDeletingCategory(null);
              }}
              onDelete={() => mutate()}
            />
          </div>
        </nav>
      </div>
    </BaseContainer>
  );
};
