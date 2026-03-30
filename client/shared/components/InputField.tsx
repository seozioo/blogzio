import clsx from 'clsx';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

type InputFieldProps = Readonly<
  { className?: string; errors?: FieldError } & DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>;

export const InputField = ({
  className,
  errors,
  ...props
}: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      <input
        className={clsx(
          'border border-gray-300 rounded-2xl px-3 h-9 text-sm focus:outline-2 outline-sky-400/20 transition-all',
          errors && 'border-red-500',
          className,
        )}
        {...props}
      />
      {errors?.message && (
        <p className="text-red-500 text-xs pl-3 h-0 relative top-px">
          {errors.message}
        </p>
      )}
    </div>
  );
};
