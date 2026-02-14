import Link from 'next/link';

export const NavigationBar = () => {
  return (
    <div className="flex justify-center items-end gap-4 text-blue-400">
      <Link href="/">Home</Link>
      <Link href="/photo">Photo</Link>
      <Link href="/article">Article</Link>
      <Link href="/guestbook">Guestbook</Link>
    </div>
  );
};
