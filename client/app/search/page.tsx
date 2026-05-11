import { apiClient } from '@/constants/api-client';
import { newCategory } from '@/constants/category';
import { PostPanel } from '@/shared/components/posts/PostPanel';

export default async function Category({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q: string; page?: string }>;
}) {
  const { q: query, page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);

  const { data: postData } = await apiClient.GET('/post/search', {
    params: {
      query: {
        q: query,
        page: page - 1,
      },
    },
  });

  return (
    <section className="my-10">
      <PostPanel
        posts={postData?.posts ?? []}
        viewType="LIST"
        currentPage={page}
        totalPages={postData?.totalPages ?? 1}
        isDisableSort
      />
    </section>
  );
}
