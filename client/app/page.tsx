import { Guestbook } from '@/shared/components/guestbooks/Guestbook';
import { MusicPlayer } from '@/shared/components/MusicPlayer';
import { PostPanel } from '@/shared/components/posts/PostPanel';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section>
        <MusicPlayer />
      </section>
      <section className='mb-50'>
        <PostPanel viewType="photo" overrideActiveCategory="new" />
      </section>
      <section className='mb-50'>
        <Guestbook />
      </section>
    </div>
  );
}
