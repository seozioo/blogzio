import { BaseContainer } from '@/shared/components/BaseContainer';
import { NavigationBar } from '@/shared/components/NavigationBar';
import { PostPhotoLink } from '@/app/photo/_components/PostPhotoLink';
import { Guestbook } from '@/shared/components/Guestbook';

const dummy = [
  {
    id: '1',
    tags: ['태그1', '태그2'],
  },
  {
    id: '2',
    tags: ['태그3', '태그4'],
  },
  {
    id: '3',
  },
  {
    id: '4',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-50 mb-50">
      <BaseContainer className="music bg-blue-400 h-[calc(100svh-200px)]">
        노래
      </BaseContainer>
      <div>
        <BaseContainer>
          <NavigationBar />
        </BaseContainer>
        <main>
          <BaseContainer className="grid grid-cols-3 gap-5">
            {dummy.map((photo) => (
              <PostPhotoLink key={photo.id} tags={photo.tags} />
            ))}
          </BaseContainer>
        </main>
      </div>
      <Guestbook />
    </div>
  );
}
