import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const buttonVariants = cva(
  'flex h-9 px-5 rounded-2xl inset-ring inset-ring-border justify-center items-center inset-shadow-button active:inset-shadow-active-button transition-all focus-visible:outline-2 outline-sky-400/50 font-semibold text-sm active:pt-1 select-none cursor-pointer',
  {
    variants: {
      variant: {
        default: 'text-white bg-sky-500 hover:bg-sky-400 active:bg-sky-600',
        outline: 'text-zinc-600 bg-white hover:bg-zinc-50 active:bg-zinc-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ButtonProps = Readonly<
  {} & ButtonPrimitive.Props & VariantProps<typeof buttonVariants>
>;

export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <ButtonPrimitive
      className={clsx(buttonVariants({ variant: props.variant }), className)}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
};
