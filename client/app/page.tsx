import { apiClient } from '@/constants/api-client';
import { Guestbook } from '@/shared/components/guestbooks/Guestbook';
import { MusicPlayer } from '@/shared/components/MusicPlayer';
import { PostPanel } from '@/shared/components/posts/PostPanel';

export default async function Home() {
  const { data } = await apiClient.GET('/post');

  return (
    <div className="flex flex-col">
      <section>
        <MusicPlayer />
      </section>
      <section className="mb-50">
        <PostPanel overrideActiveCategory="new" posts={data?.posts ?? []} />
      </section>
      <section className="mb-50">
        <Guestbook />
      </section>
    </div>
  );
}
