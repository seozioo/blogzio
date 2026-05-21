import { FormEventHandler } from 'react';
import { apiClient } from '@/constants/api-client';
import { components } from '@/types/schema';
import { BaseDialog } from '../BaseDialog';

type Category = components['schemas']['CategoryResponse'];

export type CategoryDeleteDialogProps = Readonly<{
  category: Category | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete?: VoidFunction;
}>;

export const CategoryDeleteDialog = ({
  category,
  open,
  onOpenChange,
  onDelete,
}: CategoryDeleteDialogProps) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!category?.id) return;

    const { error } = await apiClient.DELETE('/category/{categoryId}', {
      params: { path: { categoryId: category.id } },
    });

    if (error) {
      alert('카테고리 삭제에 실패했습니다.');
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
      title="카테고리 삭제"
      description={`${category?.name ?? '선택한 카테고리'}를 삭제할까요?`}
    >
      <form className="flex flex-col items-stretch" onSubmit={handleSubmit}>
        <BaseDialog.Actions>
          <BaseDialog.Close>취소</BaseDialog.Close>
          <BaseDialog.Submit>삭제</BaseDialog.Submit>
        </BaseDialog.Actions>
      </form>
    </BaseDialog>
  );
};
