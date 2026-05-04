'use client';

import { apiClient } from '@/constants/api-client';
import { Button } from '@/shared/components/Button';
import { useApi } from '@/shared/hooks/use-api';
import { HeartIcon } from '@phosphor-icons/react';

export type LikeButtonProps = Readonly<{
  className?: string;
  postId: string;
  initialLike: number;
}>;

export const LikeButton = (props: LikeButtonProps) => {
  const { data, mutate } = useApi(
    '/post/{postId}/like',
    {
      params: { path: { postId: props.postId } },
    },
    {
      fallbackData: { like: props.initialLike, isLiked: false },
    },
  );

  const handleIncrementLike = async () => {
    if (data?.isLiked) {
      alert('이미 좋아요한 게시글입니다.');
      return;
    }

    mutate(
      async () => {
        return (
          await apiClient.POST('/post/{postId}/like', {
            params: { path: { postId: props.postId } },
          })
        ).data;
      },
      {
        optimisticData: {
          like: (data?.like ?? 0) + 1,
          isLiked: true,
        },
      },
    );
  };

  return (
    <div className={props.className}>
      <div className="flex flex-col items-center gap-1">
        <Button variant="outline" size="icon" onClick={handleIncrementLike}>
          <HeartIcon
            className={data?.isLiked ? 'text-sky-500' : 'text-zinc-600'}
            size={24}
            weight={data?.isLiked ? 'fill' : 'bold'}
          />
        </Button>
        <p className="text-xs text-zinc-600">{data?.like ?? 0}</p>
      </div>
    </div>
  );
};
