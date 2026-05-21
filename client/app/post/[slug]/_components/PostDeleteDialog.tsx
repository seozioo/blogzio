'use client';

import { apiClient } from '@/constants/api-client';
import { BaseDialog } from '@/shared/components/BaseDialog';
import { FormEventHandler } from 'react';

export type PostDeleteDialogProps = Readonly<{
  postId: string;
  postTitle?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete?: VoidFunction;
}>;

export const PostDeleteDialog = ({
  postId,
  postTitle,
  open,
  onOpenChange,
  onDelete,
}: PostDeleteDialogProps) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const { error } = await apiClient.DELETE('/admin/post/{postId}', {
      params: { path: { postId } },
    });

    if (error) {
      alert('게시글 삭제에 실패했습니다.');
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
      title="게시글 삭제"
      description={`${postTitle ?? '이 게시글'}을 삭제할까요?`}
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
