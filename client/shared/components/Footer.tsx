import {
  GithubLogoIcon,
  InstagramLogoIcon,
  XLogoIcon,
} from '@phosphor-icons/react/ssr';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="flex justify-between items-center px-5 text-zinc-400 h-16 text-sm font-medium">
      © 2026 Zio. All rights reserved.
      <div className="flex relative -right-2">
        <Link
          className="p-1"
          href="https://github.com/seozioo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubLogoIcon size={24} weight="bold" />
        </Link>
      </div>
    </footer>
  );
};
