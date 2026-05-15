import { apiClient } from '@/constants/api-client';
import { BaseContainer } from '@/shared/components/BaseContainer';
import { PaginationBar } from '@/shared/components/posts/PaginationBar';
import { PostArticleLink } from '@/shared/components/posts/PostArticleLink';
import { SearchForm } from '@/shared/components/posts/SearchForm';

export default async function Category({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string; category?: string; page?: string; tag?: string | string[] }>;
}) {
  const { q: query, category, page: pageParam, tag: rawTag } = await searchParams;
  const tag = rawTag ? (Array.isArray(rawTag) ? rawTag : [rawTag]) : undefined;
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);

  const { data: postData } = await apiClient.GET('/post', {
    params: {
      query: {
        q: query,
        category,
        page: page - 1,
        tag,
      },
    },
  });

  const posts = postData?.posts;

  return (
    <section className="my-10">
      <BaseContainer className="flex gap-2 max-base:px-4 transition-[padding]">
        <SearchForm className="w-full flex gap-2" showCategory defaultQuery={query} defaultTags={tag} />
      </BaseContainer>
      <BaseContainer className="mt-5 flex flex-col gap-10 rounded-2xl px-10 py-8 bg-white shadow-xs">
        {posts?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-75">
            <p className="text-zinc-400 text-sm">검색 결과가 없습니다. ´◔▿◔`</p>
          </div>
        )}
        {posts && (
          <div className="flex flex-col divide-y divide-zinc-100 -my-4">
            {posts.map((post) => (
              <PostArticleLink
                key={post.id}
                postId={post.id}
                title={post.title}
                excerpt={post.excerpt}
                postedAt={post.postedAt}
                thumbnailUrl={post.thumbnailUrl}
                tags={post.tags?.map((tag) => tag.title!)}
              />
            ))}
          </div>
        )}
        <PaginationBar
          currentPage={page}
          totalPages={postData?.totalPages ?? 1}
        />
      </BaseContainer>
    </section>
  );
}
