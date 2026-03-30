'use client';

import { useCallback, useState } from 'react';
import { useApi } from '../hooks/use-api';
import { GuestbookMessageDialog } from './GuestbookMessageDialog';
import { GuestbookMessage } from './GuestbookMessage';
import { Button } from './Button';

export const Guestbook = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, mutate } = useApi('/guestbook');

  const refresh = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <div className="overflow-x-scroll scrollbar-hide h-160 py-2">
      <ul className="base:mx-[calc(50%-420px)] px-5 flex flex-col w-max flex-wrap gap-5 wrap h-155">
        <li>
          <Button
            variant="outline"
            className="w-75"
            onClick={() => setOpen(true)}
          >
            방명록 쓰기
          </Button>
          <GuestbookMessageDialog
            open={open}
            onOpenChange={setOpen}
            onSubmit={refresh}
          />
        </li>
        {!isLoading &&
          data?.messages?.map((message) => (
            <li key={message.id}>
              <GuestbookMessage
                id={message.id}
                nickname={message.nickname}
                createdAt={message.createdAt}
                content={message.content}
                contentType={message.contentType}
                backgroundColor={message.backgroundColor ?? 'WHITE'}
                onDelete={refresh}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
