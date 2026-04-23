import { apiClient } from '@/constants/api-client';
import { Guestbook } from '@/shared/components/guestbooks/Guestbook';
import { MusicPlayer } from '@/shared/components/MusicPlayer';
import { PostPanel } from '@/shared/components/posts/PostPanel';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1);

  const { data } = await apiClient.GET('/post', {
    params: { query: { page: page - 1 } },
  });

  return (
    <div className="flex flex-col">
      <section>
        <MusicPlayer />
      </section>
      <section className="mb-50">
        <PostPanel
          overrideActiveCategory="new"
          posts={data?.posts ?? []}
          currentPage={page}
          totalPages={data?.totalPages ?? 1}
        />
      </section>
      <section className="mb-50">
        <Guestbook />
      </section>
    </div>
  );
}
