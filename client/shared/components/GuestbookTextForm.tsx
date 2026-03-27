import {
  GuestbookMessageBgColor,
  guestbookMessageBgColorVariants,
} from '@/constants/guestbook-message-color';

export type GuestbookTextFormProps = Readonly<{
  backgroundColor?: GuestbookMessageBgColor;
  children?: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
}>;

export const GuestbookTextForm = ({
  backgroundColor,
  children,
  value,
  onChange,
}: GuestbookTextFormProps) => {
  return (
    <div
      className={guestbookMessageBgColorVariants({
        className:
          'flex flex-col gap-2 w-75 h-75 rounded-2xl border border-gray-300 p-5 focus:ring-2 focus:ring-sky-400/50 transition-colors',
        backgroundColor: backgroundColor ?? 'WHITE',
      })}
    >
      {children}
      <textarea
        className="resize-none outline-none w-full h-full"
        placeholder="방명록을 남겨주세요!"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
