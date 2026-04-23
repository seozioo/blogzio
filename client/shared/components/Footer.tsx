import {
  GithubLogoIcon,
  InstagramLogoIcon,
  XLogoIcon,
} from '@phosphor-icons/react/ssr';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="flex justify-between items-center bg-zinc-200 px-5 text-zinc-400 h-18 text-sm font-medium">
      Copyright © 2026 Zio. All rights reserved.
      <div className="flex">
        <Link
          className="p-1"
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <XLogoIcon size={24} weight="bold" />
        </Link>
        <Link
          className="p-1"
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramLogoIcon size={24} weight="bold" />
        </Link>
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
