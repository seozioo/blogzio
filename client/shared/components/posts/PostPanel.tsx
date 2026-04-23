import { MagnifyingGlassIcon } from '@phosphor-icons/react/ssr';
import { BaseContainer } from '../BaseContainer';
import { InputField } from '../InputField';
import { PostPhotoLink } from './PostPhotoLink';
import { PostArticleLink } from './PostArticleLink';
import { CategoryTab } from './CategoryTab';
import { PaginationBar } from './PaginationBar';
import { components } from '@/types/schema';

export type PostPanelProps = Readonly<{
  viewType?: 'GALLERY' | 'LIST';
  overrideActiveCategory?: string;
  posts?: components['schemas']['PostSummaryResponse'][];
  currentPage?: number;
  totalPages?: number;
}>;

export const PostPanel = (props: PostPanelProps) => {
  return (
    <>
      <CategoryTab overrideActiveCategory={props.overrideActiveCategory} />
      <BaseContainer className="select-none">
        <div className="relative flex flex-col max-w-202 mx-auto gap-4 rounded-3xl px-4 py-4 bg-white shadow-xs">
          <WritePostButton />
          <div className="flex justify-between items-center">
            <p className="p-1 text-zinc-400 text-sm">
              {props.currentPage ?? 1} / {props.totalPages ?? 1}
            </p>
            <InputField
              className="w-50"
              placeholder="검색"
              suffixIcon={
                <MagnifyingGlassIcon
                  className="text-zinc-400"
                  size={20}
                  weight="bold"
                />
              }
            />
          </div>
          {props.posts?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-75">
              <p className="text-zinc-400 text-sm">
                아직 게시글이 없습니다. ㅜ.ㅜ
              </p>
            </div>
          ) : props.viewType === 'LIST' ? (
            <div className="flex flex-col divide-y divide-border -my-4">
              {props.posts?.map((article, index) => (
                <PostArticleLink
                  key={article.id}
                  postId={article.id!}
                  tags={article.tags?.map((t) => t.title ?? '') ?? []}
                  title={article.title!}
                  excerpt={article.excerpt!}
                  postedAt={article.postedAt!}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {props.posts?.map((photo) => (
                <PostPhotoLink
                  key={photo.id}
                  postId={photo.id!}
                  title={photo.title!}
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
