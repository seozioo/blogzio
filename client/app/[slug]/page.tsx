import { apiClient } from '@/constants/api-client';
import { NEW_CATEGORY } from '@/constants/category';
import { PostPanel } from '@/shared/components/posts/PostPanel';

export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: categoryData } = await apiClient.GET('/category');

  let category = categoryData?.find((c) => c.slug === slug);
  if (!category && slug === NEW_CATEGORY.slug) {
    category = NEW_CATEGORY;
  }

  const { data: postData } = await apiClient.GET('/post', {
    params: { query: { category: category?.id } },
  });

  return (
    <section className="my-10">
      <PostPanel posts={postData?.posts ?? []} viewType={category?.type} />
    </section>
  );
}
