import { Guestbook } from '@/shared/components/guestbooks/Guestbook';
import { MusicPlayer } from '@/shared/components/MusicPlayer';
import { CategoryTab } from '@/shared/components/posts/CategoryTab';
import { PostPanel } from '@/shared/components/posts/PostPanel';

export default function Home() {
  return (
    <div className="flex flex-col">
      <section>
        <MusicPlayer />
      </section>
      <section className='mb-50'>
        <CategoryTab overrideActiveCategory="new" />
        <PostPanel viewType="photo" />
      </section>
      <section className='mb-50'>
        <Guestbook />
      </section>
    </div>
  );
}
