import { Combobox } from "@base-ui/react/combobox";
import { CaretDownIcon } from "@phosphor-icons/react";
import { Editor } from "@tiptap/react";

type Option = {
  label: string;
  value: string;
};

type EditorSelectProps = {
  editor: Editor | null;
  value: string;
  options: Option[];
  onSelect: (value: string, editor: Editor) => void;
};

export function EditorSelect({
  editor,
  value,
  options,
  onSelect,
}: EditorSelectProps) {
  if (!editor) return null;

  const handleValueChange = (val: string | null) => {
    if (val) {
      editor.chain().focus().run();
      onSelect(val, editor);
    }
  };

  const selectedLabel = options.find((opt) => opt.value === value)?.label ?? value;

  return (
    <Combobox.Root items={options} value={value} onValueChange={handleValueChange}>
      <Combobox.InputGroup className="flex items-center h-8 px-2 rounded-lg border border-border bg-white inset-ring inset-ring-border inset-shadow-button active:inset-shadow-active-button transition-all">
        <Combobox.Input
          className="outline-none px-[4px] text-[14px] text-zinc-600 field-sizing-content cursor-pointer"
          placeholder={selectedLabel}
          readOnly
        />
        <Combobox.Trigger className="flex items-center">
          <CaretDownIcon weight="fill" size={14} />
        </Combobox.Trigger>
      </Combobox.InputGroup>

      <Combobox.Portal>
        <Combobox.Positioner>
          <Combobox.Popup className="px-1 bg-white border border-border rounded-xl shadow-sm overflow-hidden">
            <Combobox.List>
              {options.map((option) => (
                <Combobox.Item
                  key={option.value}
                  value={option.value}
                  className="px-4 py-2 text-sm text-center text-zinc-600 hover:bg-zinc-50 cursor-pointer"
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
}
