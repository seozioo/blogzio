import { BaseContainer } from '@/shared/components/BaseContainer';
import { NavigationBar } from '@/shared/components/NavigationBar';
import { PostPhotoLink } from './_components/PostPhotoLink';

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
  }
];

export default function Photo() {
  return (
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
  );
}
