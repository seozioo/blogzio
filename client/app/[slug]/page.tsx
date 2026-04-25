import { apiClient } from '@/constants/api-client';
import { NEW_CATEGORY } from '@/constants/category';
import { PostPanel } from '@/shared/components/posts/PostPanel';

export default async function Category({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);

  const { data: categoryData } = await apiClient.GET('/category');

  let category = categoryData?.find((c) => c.slug === slug);
  if (!category && slug === NEW_CATEGORY.slug) {
    category = NEW_CATEGORY;
  }

  const { data: postData } = await apiClient.GET('/post', {
    params: {
      query: {
        category: category?.id,
        page: page - 1,
        thumbnailOnly: category === NEW_CATEGORY,
      },
    },
  });

  return (
    <section className="my-10">
      <PostPanel
        posts={postData?.posts ?? []}
        viewType={category?.type}
        currentPage={page}
        totalPages={postData?.totalPages ?? 1}
      />
    </section>
  );
}
