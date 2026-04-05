'use client';

import { useCallback, useState } from 'react';
import { useApi } from '../../hooks/use-api';
import { GuestbookMessage } from './GuestbookMessage';
import { Button } from '../Button';
import { GuestbookCreateDialog } from './GuestbookCreateDialog';
import { motion } from 'motion/react';

export const Guestbook = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, mutate } = useApi('/guestbook');

  const refresh = useCallback(() => {
    mutate();
  }, [mutate]);

  return (
    <div className="overflow-x-scroll scrollbar-hide h-160 py-2">
        <ul
          className="base:mx-[calc(50%-420px)] flex flex-col w-max flex-wrap gap-5 wrap h-155"
        >
          <li>
            <Button
              variant="outline"
              className="w-75"
              onClick={() => setOpen(true)}
            >
              방명록 쓰기
            </Button>
            <GuestbookCreateDialog
              open={open}
              onOpenChange={setOpen}
              onSubmit={refresh}
            />
          </li>
          {!isLoading &&
            data?.messages?.map((message) => (
              <motion.li key={message.id} layout initial={{ opacity: 0, scale: 0.5 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                <GuestbookMessage
                  id={message.id}
                  nickname={message.nickname}
                  createdAt={message.createdAt}
                  content={message.content}
                  contentType={message.contentType}
                  backgroundColor={message.backgroundColor ?? 'WHITE'}
                  onDelete={refresh}
                />
              </motion.li>
            ))}
        </ul>
    </div>
  );
};
