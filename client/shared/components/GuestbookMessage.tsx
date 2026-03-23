import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const container = cva('div', {
  variants: {
    backgroundColor: {
      WHITE: 'bg-memo-white',
      PINK: 'bg-memo-pink',
      YELLOW: 'bg-memo-yellow',
      LIME: 'bg-memo-lime',
      SKY: 'bg-memo-sky',
      VIOLET: 'bg-memo-violet',
    },
  },
});

export type GuestbookMessageProps = Readonly<
  {
    id: string;
    nickname: string;
    createdAt: string;
    content: string;
    contentType: 'TEXT' | 'IMAGE';
  } & VariantProps<typeof container>
>;

export const GuestbookMessage = (props: GuestbookMessageProps) => {
  const getDateText = (date: string) => {
    if (!date) return '알 수 없음';

    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={clsx(
        'flex p-5 w-fit h-fit rounded-2xl inset-ring-1 inset-ring-border relative shadow-sticky-note',
        container({ backgroundColor: props.backgroundColor ?? 'WHITE' }),
      )}
      key={props.id}
    >
      <div className="w-65 max-h-65 overflow-hidden">
        <div className="flex justify-between">
          <p>{props.nickname}</p>
          <p>{getDateText(props.createdAt)}</p>
        </div>
        <p className="text-pretty whitespace-pre-wrap wrap-break-word">
          {props.contentType === 'IMAGE' ? (
            <img src={props.content} alt="Guestbook Image" />
          ) : (
            props.content
          )}
        </p>
      </div>
    </div>
  );
};
