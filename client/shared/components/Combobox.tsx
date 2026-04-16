import { Combobox } from "@base-ui/react/combobox";
import { CaretDownIcon, PlusIcon } from "@phosphor-icons/react";
import { Editor } from "@tiptap/react";
import { on } from "events";
import { useState } from "react";

type Option = {
  label: string;
  value: string;
};

type EditorSelectProps = {
  editor: Editor | null;
  value: string;
  options: Option[];
  onSelect: (value: string, editor: Editor) => void;
  placeholder?: string;
};

export function EditorSelect({
  editor,
  value,
  options,
  onSelect,
  placeholder = "기본",
}: EditorSelectProps) {
  if (!editor) return null;

  return (
    <select
      value={value}
      onChange={(e) => {
        editor.chain().focus().run();
        onSelect(e.target.value, editor);
      }}
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
