'use client';

import { ContextMenu } from '@base-ui/react/context-menu';
import clsx from 'clsx';
import { ComponentProps, ReactElement, ReactNode } from 'react';

type ContextMenuRootProps = ComponentProps<typeof ContextMenu.Root>;
type ContextMenuTriggerProps = ComponentProps<typeof ContextMenu.Trigger>;
type ContextMenuItemProps = ComponentProps<typeof ContextMenu.Item>;
type ContextMenuSeparatorProps = ComponentProps<typeof ContextMenu.Separator>;

export type BaseContextMenuProps = Readonly<
  {
    trigger: ReactNode;
    children: ReactNode;
    triggerClassName?: string;
    positionerClassName?: string;
    popupClassName?: string;
  } & Omit<ContextMenuRootProps, 'children'>
>;

export type BaseContextMenuTriggerProps = Readonly<ContextMenuTriggerProps>;

export type BaseContextMenuItemProps = Readonly<ContextMenuItemProps>;

export type BaseContextMenuSeparatorProps = Readonly<ContextMenuSeparatorProps>;

const itemClass =
  'flex cursor-pointer px-4 py-2 text-sm text-zinc-600 outline-hidden select-none rounded-lg data-highlighted:bg-zinc-50 data-highlighted:text-zinc-900 data-disabled:cursor-default data-disabled:text-zinc-400 data-disabled:bg-transparent';

const BaseContextMenuRoot = ({
  trigger,
  children,
  triggerClassName,
  positionerClassName,
  popupClassName,
  ...props
}: BaseContextMenuProps) => {
  return (
    <ContextMenu.Root {...props}>
      <ContextMenu.Trigger
        className={clsx('select-none outline-none', triggerClassName)}
      >
        {trigger}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Positioner
          className={clsx('z-100 outline-hidden', positionerClassName)}
        >
          <ContextMenu.Popup
            className={clsx(
              'origin-(--transform-origin) overflow-hidden rounded-xl border border-border bg-white px-1 py-1 shadow-sm outline-hidden transition-[scale,opacity] duration-100 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0',
              popupClassName,
            )}
          >
            {children}
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};

const BaseContextMenuTrigger = ({
  className,
  ...props
}: BaseContextMenuTriggerProps) => {
  return (
    <ContextMenu.Trigger
      className={clsx('select-none outline-none', className)}
      {...props}
    />
  );
};

const BaseContextMenuItem = ({
  className,
  ...props
}: BaseContextMenuItemProps) => {
  return <ContextMenu.Item className={clsx(itemClass, className)} {...props} />;
};

const BaseContextMenuSeparator = ({
  className,
  ...props
}: BaseContextMenuSeparatorProps) => {
  return (
    <ContextMenu.Separator
      className={clsx('mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  );
};

type BaseContextMenuComponent = ((
  props: BaseContextMenuProps,
) => ReactElement) & {
  Trigger: (props: BaseContextMenuTriggerProps) => ReactElement;
  Item: (props: BaseContextMenuItemProps) => ReactElement;
  Separator: (props: BaseContextMenuSeparatorProps) => ReactElement;
};

export const BaseContextMenu = Object.assign(BaseContextMenuRoot, {
  Trigger: BaseContextMenuTrigger,
  Item: BaseContextMenuItem,
  Separator: BaseContextMenuSeparator,
}) as BaseContextMenuComponent;
