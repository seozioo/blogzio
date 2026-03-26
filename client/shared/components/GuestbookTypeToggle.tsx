import { ScribbleIcon, TextTIcon } from '@phosphor-icons/react';
import clsx from 'clsx';

export type GuestbookTypeToggleProps = Readonly<{
  value: 'TEXT' | 'IMAGE';
  onValueChange: (value: 'TEXT' | 'IMAGE') => void;
}>;

export const GuestbookTypeToggle = (props: GuestbookTypeToggleProps) => {
  return (
    <div className='flex items-center'>
      <button
        type="button"
        className={clsx(
          'size-8 rounded-lg text-zinc-600',
          props.value === 'TEXT' && 'bg-gray-200',
        )}
        onClick={() => props.onValueChange('TEXT')}
        title="text"
      >
        <TextTIcon className="m-auto" size={20} weight="bold" />
      </button>
      <button
        type="button"
        className={clsx(
          'size-8 rounded-lg text-zinc-600',
          props.value === 'IMAGE' && 'bg-gray-200',
        )}
        onClick={() => props.onValueChange('IMAGE')}
        title="image"
      >
        <ScribbleIcon className="m-auto" size={20} weight="bold" />
      </button>
    </div>
  );
};
