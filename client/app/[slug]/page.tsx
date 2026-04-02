import { PostPanel } from '@/shared/components/posts/PostPanel';

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

export default function Category() {
  return <PostPanel viewType="article" />;
}
