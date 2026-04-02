import { Combobox } from "@base-ui/react/combobox";
import { CaretDownIcon } from "@phosphor-icons/react";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  placeholder?: string;
  onChange?: (value: Option) => void;
};

export const Categorybox = ({ options, placeholder, onChange }: Props) => {
  const handleValueChange = (value: string | null) => {
    if (value && onChange) {
      const selected = options.find((opt) => opt.value === value);
      if (selected) {
        onChange(selected);
      }
    }
  };

  return (
    <Combobox.Root items={options} onValueChange={handleValueChange}>
      <Combobox.InputGroup className="flex items-center h-9 px-2 rounded-2xl border border-border bg-white inset-shadow-button active:inset-shadow-active-button transition-all appearance-none">
        <Combobox.Input
          className="px-1 outline-none text-[14px] text-zinc-600 field-sizing-content cursor-pointer"
          placeholder={placeholder}
          readOnly
        />
        <Combobox.Trigger className="flex items-center">
          <CaretDownIcon weight="fill" />
        </Combobox.Trigger>
      </Combobox.InputGroup>

      <Combobox.Portal>
        <Combobox.Positioner>
          <Combobox.Popup className="px-1 bg-white border border-border rounded-xl shadow-sm overflow-hidden">
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
