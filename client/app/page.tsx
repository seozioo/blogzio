import { BaseContainer } from '@/shared/components/BaseContainer';
import { NavigationBar } from '@/shared/components/NavigationBar';
import { PostPhotoLink } from '@/app/photo/_components/PostPhotoLink';
import { Guestbook } from '@/shared/components/Guestbook';
import { MusicPlayer } from '@/shared/components/MusicPlayer';
import { InputField } from '@/shared/components/InputField';
import {
  CaretLeftIcon,
  CaretRightIcon,
  MagnifyingGlassIcon,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/shared/components/Button';

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
      <section>
        <MusicPlayer />
      </section>
      <section>
        <NavigationBar />
        <BaseContainer className="flex flex-col gap-5 border border-border rounded-2xl px-10 py-5 bg-white">
          <div className="flex justify-between items-center">
            <p className="p-1 text-zinc-600">1 / 30</p>
            <InputField
              className="w-50"
              placeholder="검색"
              suffixIcon={<MagnifyingGlassIcon className='text-zinc-400' size={20} weight='bold' />}
            />
          </div>
          <div className="grid grid-cols-3 gap-5">
            {dummy.map((photo) => (
              <PostPhotoLink key={photo.id} tags={photo.tags} />
            ))}
          </div>
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
        </BaseContainer>
      </section>
      <section>
        <Guestbook />
      </section>
    </div>
  );
}
