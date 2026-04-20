import {
  CaretLeftIcon,
  CaretRightIcon,
  MagnifyingGlassIcon,
} from '@phosphor-icons/react/ssr';
import { BaseContainer } from '../BaseContainer';
import { InputField } from '../InputField';
import { PostPhotoLink } from './PostPhotoLink';
import { Button } from '../Button';
import { PostArticleLink } from './PostArticleLink';
import { CategoryTab } from './CategoryTab';
import { components } from '@/types/schema';

export type PostPanelProps = Readonly<{
  viewType?: 'GALLERY' | 'LIST';
  overrideActiveCategory?: string;
  posts?: components['schemas']['PostResponse'][];
}>;

export const PostPanel = (props: PostPanelProps) => {
  return (
    <>
      <CategoryTab overrideActiveCategory={props.overrideActiveCategory} />
      <BaseContainer>
        <div className="flex flex-col gap-5 border border-border rounded-2xl px-10 py-5 bg-white">
          <div className="flex justify-between items-center">
            <p className="p-1 text-zinc-600">1 / 30</p>
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
          {props.viewType === 'LIST' ? (
            <div className="flex flex-col divide-y divide-border">
              {props.posts?.map((article, index) => (
                <PostArticleLink
                  key={article.id}
                  tags={article.tags?.map((t) => t.title ?? '') ?? []}
                  title={article.title!}
                  summary={''}
                  postedAt={article.postedAt!}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-5">
              {props.posts?.map((photo) => (
                <PostPhotoLink
                  key={photo.id}
                  title={photo.title!}
                  tags={photo.tags?.map((t) => t.title ?? '') ?? []}
                />
              ))}
            </div>
          )}
          <div className="flex justify-center items-center">
            <Button variant="flat" size="icon" disabled>
              <CaretLeftIcon size={16} weight="bold" />
            </Button>
            <Button variant="flat" size="icon">
              <span className="text-sky-500">1</span>
            </Button>
            <Button variant="flat" size="icon">
              2
            </Button>
            <Button variant="flat" size="icon">
              3
            </Button>
            <Button variant="flat" size="icon">
              <CaretRightIcon size={16} weight="bold" />
            </Button>
          </div>
        </div>
      </BaseContainer>
    </>
  );
};
