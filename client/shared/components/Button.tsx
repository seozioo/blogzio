'use client';

import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { CircleNotchIcon } from '@phosphor-icons/react';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';

const buttonVariants = cva(
  'flex justify-center items-center enabled:active:inset-shadow-active-button transition-all focus-visible:outline-2 outline-sky-400/20 font-semibold text-sm enabled:active:pt-1 select-none enabled:cursor-pointer disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'text-white bg-sky-500 enabled:hover:bg-sky-400 enabled:active:bg-sky-600 border border-border inset-shadow-button',
        outline:
          'text-zinc-600 bg-white enabled:hover:bg-zinc-50 enabled:active:bg-zinc-200 border border-border inset-shadow-button',
        flat: 'text-zinc-600 enabled:hover:bg-zinc-50 enabled:active:bg-zinc-200 enabled:active:border border-border',
        editor:
          'text-zinc-600 hover:bg-white active:bg-zinc-200 hover:border border-border',
      },
      size: {
        default: 'h-9 px-4 rounded-2xl',
        icon: 'w-9 h-9 rounded-2xl',
        editor: 'w-8 h-8 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = Readonly<
  { loading?: boolean } & ButtonPrimitive.Props &
    VariantProps<typeof buttonVariants>
>;

export const Button = ({
  className,
  children,
  variant,
  size,
  loading,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <ButtonPrimitive
      className={clsx(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      <AnimatePresence initial={false}>
        {loading && (
          <motion.span
            key="spinner"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="flex items-center justify-center overflow-hidden"
          >
            <CircleNotchIcon className="animate-spin" size={16} />
          </motion.span>
        )}
        <span className="px-0.5">{children}</span>
      </AnimatePresence>
    </ButtonPrimitive>
  );
};
