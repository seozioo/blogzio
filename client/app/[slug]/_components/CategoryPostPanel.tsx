'use client';

import { apiClient } from '@/constants/api-client';
import { PostPanel } from '@/shared/components/posts/PostPanel';
import { useAuth } from '@/shared/hooks/use-auth';
import type { components } from '@/types/schema';
import { useEffect, useState } from 'react';

type PostSummaryResponse = components['schemas']['PostSummaryResponse'];

export type CategoryPostPanelProps = Readonly<{
  categoryId?: string;
  viewType?: 'GALLERY' | 'LIST';
  page: number;
  totalPages: number;
  posts: PostSummaryResponse[];
  thumbnailOnly: boolean;
}>;

export const CategoryPostPanel = ({
  categoryId,
  viewType,
  page,
  totalPages,
  posts,
  thumbnailOnly,
}: CategoryPostPanelProps) => {
  const { token } = useAuth();
  const [postData, setPostData] = useState({
    posts,
    totalPages,
  });

  useEffect(() => {
    setPostData({ posts, totalPages });
  }, [posts, totalPages]);

  useEffect(() => {
    if (!token) {
      return;
    }

    let ignore = false;

    apiClient
      .GET('/admin/post', {
        params: {
          query: {
            category: categoryId,
            page: page - 1,
            thumbnailOnly,
          },
        },
      })
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching post data:', error);
          return;
        }
        if (!ignore && data) {
          setPostData({
            posts: data.posts ?? [],
            totalPages: data.totalPages ?? 1,
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching post data:', error);
      });

    return () => {
      ignore = true;
    };
  }, [categoryId, page, thumbnailOnly, token]);

  return (
    <PostPanel
      posts={postData.posts}
      viewType={viewType}
      currentPage={page}
      totalPages={postData.totalPages}
    />
  );
};
