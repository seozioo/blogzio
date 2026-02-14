import { BaseContainer } from '@/shared/components/BaseContainer';
import { NavigationBar } from '@/shared/components/NavigationBar';
import { PostArticleLink } from './_components/PostArticleLink';
import { title } from 'process';

const dummy = [
  {
    id: '1',
    title: '제목1',
    summary: '요약1',
    postedAt: '2024-01-01',
    tags: ['태그1', '태그2'],
  },
  {
    id: '2',
    title: '제목2',
    summary: '요약2',
    postedAt: '2024-01-02',
    tags: ['태그3', '태그4'],
  },
  {
    id: '3',
    title: '제목3',
    summary: '요약3',
    postedAt: '2024-01-03',
  },
  {
    id: '4',
    title: '제목4',
    summary: '요약4',
    postedAt: '2024-01-04',
  },
];

export default function Article() {
  return (
    <div>
      <BaseContainer>
        <NavigationBar />
      </BaseContainer>
      <main>
        <BaseContainer className="flex flex-col">
          {dummy.map((article, index) => (
            <>
              {index !== 0 && <hr key={`${article.id}-divider`} className='divide-black' />}
              <PostArticleLink
                key={article.id}
                tags={article.tags}
                title={article.title}
                summary={article.summary}
                postedAt={article.postedAt}
              />
            </>
          ))}
        </BaseContainer>
      </main>
    </div>
  );
}
