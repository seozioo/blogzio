import { useEffect, useState } from 'react';
import {
  GuestbookMessageBgColor,
  guestbookMessageBgColorVariants,
} from '@/constants/guestbook-message-color';
import { XIcon } from '@phosphor-icons/react';
import clsx from 'clsx';
import { BaseDialog } from './BaseDialog';
import { InputField } from './InputField';
import { SubmitHandler, useForm } from 'react-hook-form';
import { apiClient } from '../hooks/use-api';

type Inputs = {
  password: string;
};

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
  const [dialogOpen, setDialogOpen] = useState(false);

  const { register, reset, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    if (dialogOpen) {
      reset();
    }
  }, [dialogOpen, reset]);

  const getDateText = (date: string) => {
    if (!date) return '알 수 없음';

    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { error } = await apiClient.DELETE('/guestbook/{id}', {
      params: {
        path: {
          id: props.id,
        },
      },
      body: data,
    });

    if (error) {
      alert('비밀번호를 확인해주세요.');
      return;
    }

    props.onDelete?.();
    setDialogOpen(false);
  };

  return (
    <>
      <BaseDialog
        popupClassName="w-full max-w-xs"
        open={dialogOpen}
        onOpenChange={(value) => setDialogOpen(value)}
        title="방명록 삭제"
      >
        <form
          className="flex flex-col items-stretch"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            className="w-full"
            type="password"
            placeholder="비밀번호"
            {...register('password', { required: true })}
          />
          <BaseDialog.Actions>
            <BaseDialog.Close>취소</BaseDialog.Close>
            <BaseDialog.Submit>삭제</BaseDialog.Submit>
          </BaseDialog.Actions>
        </form>
      </BaseDialog>
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
              <button
                type="button"
                className="absolute -translate-y-1.5 size-8 cursor-pointer outline-none"
                aria-label="delete"
                onClick={() => setDialogOpen(true)}
              >
                <XIcon className="m-auto" size={20} />
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
    </>
  );
};
