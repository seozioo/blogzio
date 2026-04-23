import { apiClient } from '@/constants/api-client';
import { notFound } from 'next/navigation';

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
    notFound();
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <article>{`${JSON.stringify(data.content)}`}</article>
    </div>
  );
}
