import { BaseContainer } from '../BaseContainer';
import { PostPhotoLink } from './PostPhotoLink';
import { PostArticleLink } from './PostArticleLink';
import { PaginationBar } from './PaginationBar';
import { components } from '@/types/schema';
import { WritePostButton } from '../PostWriteButton';
import { SearchForm } from './SearchForm';
import { CategoryTab } from './CategoryTab';

export type PostPanelProps = Readonly<{
  viewType?: 'GALLERY' | 'LIST';
  overrideActiveCategory?: string;
  posts?: components['schemas']['PostSummaryResponse'][];
  currentPage?: number;
  totalPages?: number;
}>;

export const PostPanel = (props: PostPanelProps) => {
  const posts = props.posts ?? [];
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.postedAt ?? '').getTime();
    const dateB = new Date(b.postedAt ?? '').getTime();
    return dateB - dateA;
  });

  return (
    <>
      <CategoryTab overrideActiveCategory={props.overrideActiveCategory} />
      <BaseContainer className="select-none">
        <div
          className="relative flex flex-col gap-10 rounded-2xl px-10 py-8 bg-white shadow-xs"
          style={{ viewTransitionName: 'post-panel' }}
        >
          <WritePostButton />
          <div className="flex justify-between items-center">
            <p className="p-1 text-zinc-400 text-sm">
              {props.currentPage ?? 1} / {props.totalPages ?? 1}
            </p>
            <SearchForm className="w-50" />
          </div>
          {sortedPosts?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-75">
              <p className="text-zinc-400 text-sm">
                아직 게시글이 없습니다. ㅜ.ㅜ
              </p>
            </div>
          ) : props.viewType === 'LIST' ? (
            <div className="flex flex-col divide-y divide-zinc-100 -my-4">
              {sortedPosts?.map((article) => (
                <PostArticleLink
                  key={article.id}
                  postId={article.id!}
                  tags={article.tags?.map((t) => t.title ?? '') ?? []}
                  title={article.title!}
                  thumbnailUrl={article.thumbnailUrl}
                  excerpt={article.excerpt!}
                  postedAt={article.postedAt!}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {sortedPosts?.map((photo) => (
                <PostPhotoLink
                  key={photo.id}
                  postId={photo.id!}
                  title={photo.title!}
                  thumbnailUrl={photo.thumbnailUrl}
                  tags={photo.tags?.map((t) => t.title ?? '') ?? []}
                />
              ))}
            </div>
          )}
          <PaginationBar
            currentPage={props.currentPage ?? 1}
            totalPages={props.totalPages ?? 1}
          />
        </div>
      </BaseContainer>
    </>
  );
};
