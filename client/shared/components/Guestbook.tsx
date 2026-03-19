'use client';

import { useCallback } from 'react';
import { useApi } from '../hooks/use-api';
import { GuestbookInput } from './GuestbookInput';
import { GuestbookMessage } from './GuestbookMessage';

export const Guestbook = () => {
  const { data, isLoading, mutate } = useApi('/guestbook');

  const onSubmit = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <div className="overflow-x-scroll scrollbar-hide h-160">
      <div className="base:mx-[calc(50%-420px)] px-5 flex flex-col w-max flex-wrap gap-5 wrap h-155">
        <GuestbookInput onSubmit={onSubmit} />
        {!isLoading &&
          data?.messages?.map((message) => (
            <GuestbookMessage
              key={message.id}
              id={message.id}
              nickname={message.nickname}
              createdAt={message.createdAt}
              content={message.content}
              contentType={message.contentType}
              backgroundColor={message.backgroundColor}
            />
          ))}
      </div>
    </div>
  );
};
