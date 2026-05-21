import { apiClient } from '@/constants/api-client';
import { newCategory } from '@/constants/category';
import { PostPanel } from '@/shared/components/posts/PostPanel';
import { notFound } from 'next/navigation';

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

  let category = categoryData?.categories.find((c) => c.slug === slug);
  if (!category && slug === newCategory.slug) {
    category = { ...newCategory, id: undefined };
  }

  if (!category) {
    notFound();
  }

  const { data: postData } = await apiClient.GET('/post', {
    params: {
      query: {
        category: category?.id,
        page: page - 1,
        thumbnailOnly: category === newCategory,
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
