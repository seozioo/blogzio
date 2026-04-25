import { apiClient } from '@/constants/api-client';
import { baseExtensions } from '@/shared/lib/editor-extensions';
import { generateHTML } from '@tiptap/html';
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

  const html = generateHTML(data.content, baseExtensions);

  return (
    <div>
      <h1>{data.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
