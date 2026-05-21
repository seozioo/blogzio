import { apiClient } from '@/constants/api-client';
import { AdminPostFallback } from './_components/AdminPostFallback';
import { PostDetail } from './_components/PostDetail';

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data } = await apiClient.GET('/post/{postId}', {
    params: { path: { postId: slug } },
  });

  if (!data) {
    return <AdminPostFallback postId={slug} />;
  }

  const { data: pageData } = await apiClient.GET('/post/{postId}/page', {
    params: {
      path: { postId: slug },
      query: { category: data.categoryId } as Record<string, string>,
    },
  });

  const currentPage = pageData?.page ?? 0;

  const { data: postListData } = await apiClient.GET('/post', {
    params: {
      query: { category: data.categoryId, page: currentPage },
    },
  });

  return (
    <PostDetail
      post={data}
      postList={postListData?.posts ?? []}
      currentPage={currentPage + 1}
      totalPages={postListData?.totalPages ?? 1}
    />
  );
}
