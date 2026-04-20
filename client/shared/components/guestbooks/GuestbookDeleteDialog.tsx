import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BaseDialog } from '../BaseDialog';
import { InputField } from '../InputField';
import { apiClient } from '@/constants/api-client';

type Inputs = {
  password: string;
};

export type GuestbookDeleteDialogProps = Readonly<{
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete?: VoidFunction;
}>;

export const GuestbookDeleteDialog = ({
  id,
  open,
  onOpenChange,
  onDelete,
}: GuestbookDeleteDialogProps) => {
  const { register, reset, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { error } = await apiClient.DELETE('/guestbook/{id}', {
      params: {
        path: { id },
      },
      body: data,
    });

    if (error) {
      alert('비밀번호를 확인해주세요.');
      return;
    }

    onDelete?.();
    onOpenChange(false);
  };

  return (
    <BaseDialog
      popupClassName="w-full max-w-xs"
      open={open}
      onOpenChange={onOpenChange}
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
  );
};
