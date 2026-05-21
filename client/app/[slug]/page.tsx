import { apiClient } from '@/constants/api-client';
import { newCategory } from '@/constants/category';
import { notFound } from 'next/navigation';
import { CategoryPostPanel } from './_components/CategoryPostPanel';

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

  const isNewCategory = slug === newCategory.slug;
  let category = categoryData?.categories.find((c) => c.slug === slug);
  if (!category && isNewCategory) {
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
        thumbnailOnly: isNewCategory,
      },
    },
  });

  return (
    <section className="my-10">
      <CategoryPostPanel
        categoryId={category?.id}
        posts={postData?.posts ?? []}
        viewType={category?.type}
        page={page}
        totalPages={postData?.totalPages ?? 1}
        thumbnailOnly={isNewCategory}
      />
    </section>
  );
}
