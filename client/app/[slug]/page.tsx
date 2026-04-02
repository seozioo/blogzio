import { CategoryTab } from '@/shared/components/posts/CategoryTab';
import { PostPanel } from '@/shared/components/posts/PostPanel';

export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <section className="my-10">
      <CategoryTab overrideActiveCategory={slug} />
      <PostPanel viewType={slug === 'article' ? 'article' : 'photo'} />
    </section>
  );
}
