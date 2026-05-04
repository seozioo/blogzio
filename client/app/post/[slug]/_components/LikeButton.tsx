'use client';

import { Button } from '@/shared/components/Button';
import { HeartIcon } from '@phosphor-icons/react';

export type LikeButtonProps = Readonly<{
  className?: string;
}>;

export const LikeButton = (props: LikeButtonProps) => {
  return (
    <Button className={props.className} variant="outline" size="icon">
      <HeartIcon size={24} weight="bold" />
    </Button>
  );
};
