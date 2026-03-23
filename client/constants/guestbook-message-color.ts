import { cva } from 'class-variance-authority';

export const guestbookMessageBgColors = [
  'PINK',
  'YELLOW',
  'LIME',
  'SKY',
  'VIOLET',
  'WHITE',
] as const;

export type GuestbookMessageBgColor = (typeof guestbookMessageBgColors)[number];

export const guestbookMessageBgColorVariants = cva<{
  backgroundColor: {[key in GuestbookMessageBgColor]: string}
}>('', {
  variants: {
    backgroundColor: {
      WHITE: 'bg-memo-white',
      PINK: 'bg-memo-pink',
      YELLOW: 'bg-memo-yellow',
      LIME: 'bg-memo-lime',
      SKY: 'bg-memo-sky',
      VIOLET: 'bg-memo-violet',
    },
  },
});
