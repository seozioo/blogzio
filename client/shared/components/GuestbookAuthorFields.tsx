import { ComponentPropsWithoutRef } from 'react';

export type GuestbookAuthorFieldsProps = Readonly<{
  nicknameInputProps: ComponentPropsWithoutRef<'input'>;
  passwordInputProps: ComponentPropsWithoutRef<'input'>;
}>;

export const GuestbookAuthorFields = ({
  nicknameInputProps,
  passwordInputProps,
}: GuestbookAuthorFieldsProps) => {
  return (
    <div className="flex gap-2 text-sm text-black/50">
      <input
        className="flex-2 w-full outline-none pointer-events-auto"
        placeholder="닉네임"
        {...nicknameInputProps}
      />
      <input
        className="flex-1 w-full outline-none pointer-events-auto"
        type="password"
        placeholder="비밀번호"
        {...passwordInputProps}
      />
    </div>
  );
};
