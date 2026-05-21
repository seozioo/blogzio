'use client';

import { Button } from '@/shared/components/Button';
import { PencilIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

export type EditButtonProps = Readonly<{
  className?: string;
  postId: string;
}>;

export const EditButton = (props: EditButtonProps) => {
  const router = useRouter();

  return (
    <Button
      className={props.className}
      variant="flat"
      size="icon"
      onClick={async () => {
        router.push(`/write?edit=${props.postId}`);
      }}
    >
      <PencilIcon className="text-zinc-400" size={20} weight="bold" />
    </Button>
  );
};
