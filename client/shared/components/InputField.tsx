import clsx from 'clsx';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

type InputFieldProps = Readonly<
  { className?: string; errors?: FieldError } & DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>;

export const InputField = ({ className, errors, ...props }: InputFieldProps) => {
  return (
    <input
      className={clsx(
        'border border-gray-300 rounded-2xl px-3 h-9 text-sm',
        errors && errors.message ? 'border-red-500' : '',
        className,
      )}
      {...props}
    />
  );
};
