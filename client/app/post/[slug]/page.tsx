import { apiClient } from '@/constants/api-client';
import { BaseContainer } from '@/shared/components/BaseContainer';
import { Button } from '@/shared/components/Button';
import { PostPanel } from '@/shared/components/posts/PostPanel';
import { baseExtensions } from '@/shared/lib/editor-extensions';
import { ExportIcon } from '@phosphor-icons/react/ssr';
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
        <BaseContainer className="bg-white rounded-2xl px-4 py-4 flex flex-col gap-4">
          <div className="px-1">
            <p className="text-sm font-semibold text-zinc-600">
              {data.categoryName}
            </p>
            <h1 className="-indent-0.5 text-2xl font-semibold">{data.title}</h1>
            <div className="mt-2 flex justify-between items-center">
              <p className="text-sm text-zinc-600">
                {data.postedAt &&
                  new Date(data.postedAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
              </p>
              <div className="size-5 relative">
                <Button
                  className="absolute -top-2 -left-2"
                  variant="flat"
                  size="icon"
                >
                  <ExportIcon
                    className="text-zinc-400"
                    size={20}
                    weight="bold"
                  />
                </Button>
              </div>
            </div>
          </div>
          <hr className="border-t border-border" />
          <article
            className="px-1 min-h-100 [&_p]:empty:before:content-['\a0']"
            dangerouslySetInnerHTML={{ __html: html }}
          />
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
