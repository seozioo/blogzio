import clsx from "clsx";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

type InputFieldProps = Readonly<
  {
    className?: string;
    errors?: FieldError;
    suffixIcon?: React.ReactNode;
  } & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>;

export const InputField = ({
  className,
  errors,
  suffixIcon,
  ...props
}: InputFieldProps) => {
  return (
    <div className={clsx("flex flex-col", className)}>
      <div
        className={clsx(
          "flex items-center border rounded-2xl px-3 h-9 text-sm transition-all focus-within:ring-2",
          errors?.message
            ? "border-red-500 ring-red-500/20"
            : "border-border ring-sky-400/20",
        )}
      >
        <input
          className="flex-1 w-full h-full bg-transparent outline-none placeholder:text-zinc-400"
          aria-invalid={errors?.message ? true : false}
          {...props}
        />
        {suffixIcon && <div className="relative left-0.5">{suffixIcon}</div>}
      </div>
      {errors?.message && (
        <p className="text-red-500 text-xs pl-3 h-0 relative top-px">
          {errors.message}
        </p>
      )}
    </div>
  );
};
