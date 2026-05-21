'use client';

import { BaseContainer } from '@/shared/components/BaseContainer';
import { PostPanel } from '@/shared/components/posts/PostPanel';
import { TagList } from '@/shared/components/posts/TagList';
import { baseExtensions } from '@/shared/lib/editor-extensions';
import type { components } from '@/types/schema';
import { generateHTML } from '@tiptap/html';
import type { JSONContent } from '@tiptap/react';
import dynamic from 'next/dynamic';
import { ExportButton } from './ExportButton';
import { LikeButton } from './LikeButton';

const PostAuthorActions = dynamic(
  () =>
    import('./PostAuthorActions').then((mod) => mod.PostAuthorActions),
  { ssr: false },
);

type PostResponse = components['schemas']['PostResponse'];
type PostSummaryResponse = components['schemas']['PostSummaryResponse'];

export type PostDetailProps = Readonly<{
  post: PostResponse;
  postList?: PostSummaryResponse[];
  currentPage?: number;
  totalPages?: number;
  showPostPanel?: boolean;
}>;

export const PostDetail = ({
  post,
  postList = [],
  currentPage = 1,
  totalPages = 1,
  showPostPanel = true,
}: PostDetailProps) => {
  const html = generateHTML(post.content as JSONContent, baseExtensions);

  return (
    <div className="my-10">
      <section>
        <BaseContainer className="bg-white rounded-2xl gap-4 px-10 py-8 flex flex-col">
          <div className="px-1">
            <p className="text-sm font-semibold text-zinc-600">
              {post.categoryName}
            </p>
            <h1 className="-indent-0.5 text-2xl font-semibold">{post.title}</h1>
            <div className="mt-2 flex justify-between items-center">
              <p className="text-sm text-zinc-600">
                {post.postedAt &&
                  new Date(post.postedAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
              </p>
              <div className="flex gap-4">
                <PostAuthorActions postId={post.id} postTitle={post.title} />
                <div className="size-5 relative">
                  <ExportButton className="absolute -top-2 -left-2" />
                </div>
              </div>
            </div>
          </div>
          <hr className="border-t border-border" />
          <article
            className="px-1 min-h-100 [&_p]:empty:before:content-['\a0']"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {post.tags && (
            <TagList
              tags={post.tags.map((tag) => tag.title!)}
              className="mt-2 px-1"
            />
          )}
          <LikeButton
            className="mx-auto"
            postId={post.id}
            initialLike={post.likes}
          />
        </BaseContainer>
      </section>
      {showPostPanel && (
        <section className="mt-50">
          <PostPanel
            overrideActiveCategory={post.categoryId}
            posts={postList}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </section>
      )}
    </div>
  );
};
