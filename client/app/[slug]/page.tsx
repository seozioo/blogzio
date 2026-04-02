import { PostPanel } from '@/shared/components/posts/PostPanel';

export default async function Category({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <section className="my-10">
      <PostPanel viewType={slug === 'article' ? 'article' : 'photo'} />
    </section>
  );
}
