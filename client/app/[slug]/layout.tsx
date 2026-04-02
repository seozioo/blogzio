import { CategoryTab } from '@/shared/components/posts/CategoryTab';

export default function CategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="my-10">
      <CategoryTab />
      {children}
    </section>
  );
}
