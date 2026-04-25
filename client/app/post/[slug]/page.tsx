import { apiClient } from '@/constants/api-client';
import { BaseContainer } from '@/shared/components/BaseContainer';
import { PostPanel } from '@/shared/components/posts/PostPanel';
import { baseExtensions } from '@/shared/lib/editor-extensions';
import { generateHTML } from '@tiptap/html';
import { JSONContent } from '@tiptap/react';
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

  const html = generateHTML(data.content as JSONContent, baseExtensions);

  const { data: postListData } = await apiClient.GET('/post', {
    params: {
      query: { category: data.categoryId },
    },
  });

  return (
    <div>
      <section>
        <BaseContainer className="bg-white rounded-2xl px-4 py-4">
          <h1>{data.title}</h1>
          <article dangerouslySetInnerHTML={{ __html: html }} />
        </BaseContainer>
      </section>
      <section className="mt-50">
        <PostPanel
          overrideActiveCategory={data.categoryId}
          posts={postListData?.posts ?? []}
        />
      </section>
    </div>
  );
}
