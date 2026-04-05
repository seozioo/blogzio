import { Toggle, ToggleGroup } from '@base-ui/react';
import { ScribbleIcon, TextTIcon } from '@phosphor-icons/react';

export type GuestbookTypeToggleProps = Readonly<{
  value: 'TEXT' | 'IMAGE';
  onValueChange: (value: 'TEXT' | 'IMAGE') => void;
}>;

export const GuestbookTypeToggle = (props: GuestbookTypeToggleProps) => {
  return (
    <ToggleGroup
      className="flex items-center"
      value={[props.value]}
      onValueChange={(values) =>
        props.onValueChange(values[0] as 'TEXT' | 'IMAGE')
      }
    >
      <Toggle
        className="size-8 rounded-lg text-zinc-600 data-pressed:bg-gray-200"
        aria-label="text"
        value="TEXT"
      >
        <TextTIcon className="m-auto" size={20} weight="bold" />
      </Toggle>
      <Toggle
        className="size-8 rounded-lg text-zinc-600 data-pressed:bg-gray-200"
        aria-label="image"
        value="IMAGE"
      >
        <ScribbleIcon className="m-auto" size={20} weight="bold" />
      </Toggle>
    </ToggleGroup>
  );
};
