import {
  GuestbookMessageBgColor,
  guestbookMessageBgColorVariants,
} from '@/constants/guestbook-message-color';
import { XIcon } from '@phosphor-icons/react';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

export type GuestbookMessageProps = Readonly<{
  id: string;
  nickname: string;
  createdAt: string;
  content: string;
  contentType: 'TEXT' | 'IMAGE';
  backgroundColor: GuestbookMessageBgColor;
  onDelete?: VoidFunction;
}>;

export const GuestbookMessage = (props: GuestbookMessageProps) => {
  const getDateText = (date: string) => {
    if (!date) return '알 수 없음';

    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={guestbookMessageBgColorVariants({
        className: clsx(
          'flex p-5 rounded-2xl inset-ring-1 inset-ring-border shadow-sticky-note overflow-hidden group',
          props.contentType === 'IMAGE' ? 'size-75' : 'w-fit h-fit',
        ),
        backgroundColor: props.backgroundColor,
      })}
      key={props.id}
    >
      <div className="flex flex-col relative gap-2 w-65 max-h-65 overflow-hidden">
        <div className="flex text-sm text-black/50">
          <p className="flex-1">{props.nickname}</p>
          <p>{getDateText(props.createdAt)}</p>
          <div className="w-0 group-hover:w-6 h-1 relative transition-all">
            <button className='absolute -translate-y-1.5 size-8 cursor-pointer' title="delete" onClick={props.onDelete}>
              <XIcon className='m-auto' size={20} />
            </button>
          </div>
        </div>
        {props.contentType === 'TEXT' && (
          <p className="text-pretty whitespace-pre-wrap wrap-break-word">
            {props.content}
          </p>
        )}
      </div>
      {props.contentType === 'IMAGE' && (
        <img
          className="absolute top-0 left-0 size-75 pointer-events-none"
          src={props.content}
          alt="Guestbook Image"
        />
      )}
    </div>
  );
};
