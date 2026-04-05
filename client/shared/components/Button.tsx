import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  "flex rounded-2xl justify-center items-center enabled:active:inset-shadow-active-button transition-all focus-visible:outline-2 outline-sky-400/20 font-semibold text-sm enabled:active:pt-1 select-none enabled:cursor-pointer disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "text-white bg-sky-500 enabled:hover:bg-sky-400 enabled:active:bg-sky-600 border border-border inset-shadow-button",
        outline:
          "text-zinc-600 bg-white enabled:hover:bg-zinc-50 enabled:active:bg-zinc-200 border border-border inset-shadow-button",
        flat: "text-zinc-600 enabled:active:border border-border",
        link: "text-zinc-600 hover:bg-white active:bg-zinc-200 hover:border border-border rounded-lg",
      },
      size: {
        default: "h-9 px-5",
        icon: "w-9 h-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = Readonly<
  {} & ButtonPrimitive.Props & VariantProps<typeof buttonVariants>
>;

export const Button = ({
  className,
  children,
  variant,
  size,
  ...props
}: ButtonProps) => {
  return (
    <ButtonPrimitive
      className={clsx(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </ButtonPrimitive>
  );
};
