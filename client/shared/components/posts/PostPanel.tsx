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

const dummy = [
  {
    id: '1',
    title: '게시글 제목',
    summary:
      '게시글 요약 게시글 요약 게시글 요약 게시글 요약 게시글 요약 게시글 요약 게시글 요약 게시글 요약 게시글 요약 게시글 요약',
    postedAt: '2024-06-01',
    tags: ['태그1', '태그2'],
  },
  {
    id: '2',
    title: '게시글 제목 2',
    summary:
      '게시글 요약 2 게시글 요약 2 게시글 요약 2 게시글 요약 2 게시글 요약 2 게시글 요약 2 게시글 요약 2 게시글 요약 2 게시글 요약 2 게시글 요약 2',
    postedAt: '2024-06-02',
    tags: ['태그3', '태그4'],
  },
  {
    id: '3',
    title: '게시글 제목 3',
    summary:
      '게시글 요약 3 게시글 요약 3 게시글 요약 3 게시글 요약 3 게시글 요약 3 게시글 요약 3 게시글 요약 3 게시글 요약 3 게시글 요약 3 게시글 요약 3',
    postedAt: '2024-06-03',
    tags: ['태그5', '태그6'],
  },
  {
    id: '4',
    title: '게시글 제목 4',
    summary:
      '게시글 요약 4 게시글 요약 4 게시글 요약 4 게시글 요약 4 게시글 요약 4 게시글 요약 4 게시글 요약 4 게시글 요약 4 게시글 요약 4 게시글 요약 4',
    postedAt: '2024-06-04',
    tags: ['태그7', '태그8'],
  },
];

export type PostPanelProps = Readonly<{
  viewType: 'article' | 'photo';
  overrideActiveCategory?: string;
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
          {props.viewType === 'article' ? (
            <div className="flex flex-col divide-y divide-border">
              {dummy.map((article, index) => (
                <PostArticleLink
                  key={article.id}
                  tags={article.tags}
                  title={article.title}
                  summary={article.summary}
                  postedAt={article.postedAt}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-5">
              {dummy.map((photo) => (
                <PostPhotoLink
                  key={photo.id}
                  title={photo.title}
                  tags={photo.tags}
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
