import { Combobox } from "@base-ui/react/combobox";
import { CaretDownIcon, PlusIcon } from "@phosphor-icons/react";
import { on } from "events";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  defaultValue?: Option;
  onChange?: (value: Option | null) => void;
};

export const ComboboxSelect = ({ options, defaultValue, onChange }: Props) => {
  const handleValueChange = (value: string | null) => {
    if (value && onChange) {
      const selected = options.find((opt) => opt.value === value);
      if (selected) {
        onChange(selected);
      }
    }
  };

  return (
    <Combobox.Root
      items={options}
      onValueChange={handleValueChange}
      defaultValue={defaultValue?.label}
    >
      <Combobox.InputGroup className="flex items-center h-8 px-2 rounded-lg border border-border bg-white inset-ring inset-ring-border inset-shadow-button active:inset-shadow-active-button transition-all">
        <Combobox.Input
          className="outline-none text-[14px] text-zinc-600 px-1 field-sizing-content cursor-pointer"
          readOnly
        />
        <Combobox.Trigger className="flex items-center">
          <CaretDownIcon weight="fill" />
        </Combobox.Trigger>
      </Combobox.InputGroup>

      <Combobox.Portal>
        <Combobox.Positioner>
          <Combobox.Popup className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
            <Combobox.List>
              {options.map((option) => (
                <Combobox.Item
                  key={option.value}
                  value={option}
                  className="px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50 cursor-pointer"
                >
                  {option.label}
                </Combobox.Item>
              ))}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
};
