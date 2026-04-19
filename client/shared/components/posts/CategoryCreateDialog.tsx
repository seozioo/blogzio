import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { apiClient } from '../../hooks/use-api';
import { BaseDialog } from '../BaseDialog';
import { InputField } from '../InputField';

type Inputs = {
  name: string;
  slug: string;
  type: 'GALLERY' | 'LIST';
};

export type CategoryCreateDialogProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate?: VoidFunction;
}>;

export const CategoryCreateDialog = ({
  open,
  onOpenChange,
  onCreate,
}: CategoryCreateDialogProps) => {
  const { register, reset, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { error } = await apiClient.POST('/category', {
      body: data,
    });

    if (error) {
      alert('카테고리 생성에 실패했습니다.');
      return;
    }

    onCreate?.();
    onOpenChange(false);
  };

  return (
    <BaseDialog
      popupClassName="w-full max-w-xs"
      open={open}
      onOpenChange={onOpenChange}
      title="카테고리 생성"
    >
      <form
        className="flex flex-col items-stretch"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          className="w-full"
          placeholder="이름"
          {...register('name', { required: true })}
        />
        <InputField
          className="w-full"
          placeholder="슬러그"
          {...register('slug', { required: true })}
        />
        <select className="" {...register('type', { required: true })}>
          <option value="GALLERY">갤러리</option>
          <option value="LIST">리스트</option>
        </select>
        <BaseDialog.Actions>
          <BaseDialog.Close>취소</BaseDialog.Close>
          <BaseDialog.Submit>생성</BaseDialog.Submit>
        </BaseDialog.Actions>
      </form>
    </BaseDialog>
  );
};
