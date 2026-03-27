import {
  GuestbookMessageBgColor,
  guestbookMessageBgColors,
  guestbookMessageBgColorVariants,
} from '@/constants/guestbook-message-color';
import { Radio, RadioGroup } from '@base-ui/react';

export type GuestbookBgSelectorProps = Readonly<{
  value?: GuestbookMessageBgColor;
  onValueChange: (value: GuestbookMessageBgColor) => void;
}>;

export const GuestbookBgSelector = (props: GuestbookBgSelectorProps) => {
  const renderRadioOption = (color: GuestbookMessageBgColor) => (
    <Radio.Root
      key={color}
      value={color}
      className={guestbookMessageBgColorVariants({
        className:
          'flex size-6 items-center justify-center rounded-lg border border-border inset-ring-0 inset-ring-white hover:inset-ring-4 data-checked:to-white data-checked:from-white transition-all focus-visible:ring-2 focus-visible:ring-sky-400/50 outline-none active:translate-y-px data-checked:-translate-y-0.5',
        backgroundColor: color,
      })}
    >
      <Radio.Indicator
        className={guestbookMessageBgColorVariants({
          className:
            'size-4 rounded-sm border border-border data-[state=checked]:bg-white',
          backgroundColor: color,
        })}
      />
    </Radio.Root>
  );

  return (
    <RadioGroup
      className="flex gap-2"
      value={props.value}
      onValueChange={props.onValueChange}
    >
      {guestbookMessageBgColors.map((color) => renderRadioOption(color))}
    </RadioGroup>
  );
};
