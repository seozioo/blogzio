'use client';

import { apiClient } from '@/constants/api-client';
import { BaseContainer } from '@/shared/components/BaseContainer';
import type { components } from '@/types/schema';
import { useEffect, useState } from 'react';
import { PostDetail } from './PostDetail';
import { notFound, useRouter } from 'next/navigation';

type PostResponse = components['schemas']['PostResponse'];

export type AdminPostFallbackProps = Readonly<{
  postId: string;
}>;

export const AdminPostFallback = ({ postId }: AdminPostFallbackProps) => {
  const router = useRouter();

  const [post, setPost] = useState<PostResponse | null>();

  useEffect(() => {
    let ignore = false;

    apiClient
      .GET('/admin/post/{postId}', {
        params: { path: { postId } },
      })
      .then(({ data }) => {
        if (!ignore) {
          setPost(data ?? null);
        }
      })
      .catch(() => {
        if (!ignore) {
          setPost(null);
        }
      });

    return () => {
      ignore = true;
    };
  }, [postId]);

  if (post === undefined) {
    // 로딩 상태
    return null;
  }

  if (post === null) {
    return notFound();
  }

  return <PostDetail post={post} showPostPanel={false} />;
};
