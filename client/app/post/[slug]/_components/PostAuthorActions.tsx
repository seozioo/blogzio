'use client';

import { useAuth } from '@/shared/hooks/use-auth';
import { DeleteButton } from './DeleteButton';
import { EditButton } from './EditButton';

export type PostAuthorActionsProps = Readonly<{
  postId: string;
  postTitle?: string;
}>;

export const PostAuthorActions = ({
  postId,
  postTitle,
}: PostAuthorActionsProps) => {
  const { token } = useAuth();

  if (!token) {
    return null;
  }

  return (
    <div className="flex gap-4">
      <div className="size-5 relative">
        <EditButton className="absolute -top-2 -left-2" postId={postId} />
      </div>
      <div className="size-5 relative">
        <DeleteButton
          className="absolute -top-2 -left-2"
          postId={postId}
          postTitle={postTitle}
        />
      </div>
    </div>
  );
};
