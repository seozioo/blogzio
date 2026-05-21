'use client';

import { Button } from '@/shared/components/Button';
import { TrashIcon } from '@phosphor-icons/react';
import { cx } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PostDeleteDialog } from './PostDeleteDialog';

export type DeleteButtonProps = Readonly<{
  className?: string;
  postId: string;
  postTitle?: string;
}>;

export const DeleteButton = (props: DeleteButtonProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        className={cx(props.className, 'group')}
        variant="flat"
        size="icon"
        onClick={() => setOpen(true)}
      >
        <TrashIcon
          className="text-zinc-400 group-hover:text-red-500"
          size={20}
          weight="bold"
        />
      </Button>
      <PostDeleteDialog
        postId={props.postId}
        postTitle={props.postTitle}
        open={open}
        onOpenChange={setOpen}
        onDelete={() => {
          router.replace('/');
          router.refresh();
        }}
      />
    </>
  );
};
