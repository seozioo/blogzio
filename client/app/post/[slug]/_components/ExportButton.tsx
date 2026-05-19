'use client';

import { Button } from '@/shared/components/Button';
import { ExportIcon } from '@phosphor-icons/react';

export type ExportButtonProps = Readonly<{
  className?: string;
}>;

export const ExportButton = (props: ExportButtonProps) => {
  return (
    <Button
      className={props.className}
      variant="flat"
      size="icon"
      onClick={async () => {
        await navigator.clipboard.writeText(window.location.href);
        alert('링크가 복사되었습니다!');
      }}
    >
      <ExportIcon className="text-zinc-400" size={20} weight="bold" />
    </Button>
  );
};
