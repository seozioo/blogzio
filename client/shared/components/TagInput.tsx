import { XIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { ChangeEvent, KeyboardEvent, useState } from "react";

const NOT_TAG_KEY = /[~!@#$%";'^,&*()_+|<>=?:{}\[\]\/\\\-]/g;

type TagInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  hashOnly?: boolean;
  text?: string;
  onTextChange?: (text: string) => void;
  onSubmit?: () => void;
  suffixIcon?: React.ReactNode;
};

export const TagInput = ({
  value,
  onChange,
  placeholder,
  className,
  hashOnly = false,
  text: controlledText,
  onTextChange,
  onSubmit,
  suffixIcon,
}: TagInputProps) => {
  const [uncontrolledText, setUncontrolledText] = useState("");
  const isControlled = controlledText !== undefined;
  const input = isControlled ? controlledText : uncontrolledText;
  const setInput = isControlled ? (onTextChange ?? (() => {})) : setUncontrolledText;

  const addTag = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    if (hashOnly) {
      if (!trimmed.startsWith('#')) return;
      const tag = trimmed.slice(1).trim();
      if (!tag || value.includes(tag)) {
        setInput("");
        return;
      }
      onChange([...value, tag]);
      setInput("");
      return;
    }

    if (value.includes(trimmed)) {
      setInput("");
      return;
    }
    onChange([...value, trimmed]);
    setInput("");
  };

  const removeTag = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!hashOnly) val = val.replace(NOT_TAG_KEY, '');

    const isDelimiter = val.endsWith(' ') || val.endsWith(',');
    if (isDelimiter) {
      if (hashOnly) {
        const words = val.slice(0, -1).split(' ');
        const lastWord = words.at(-1) ?? '';
        if (lastWord.startsWith('#')) {
          const tag = lastWord.slice(1).replace(NOT_TAG_KEY, '').trim();
          if (tag && !value.includes(tag)) {
            onChange([...value, tag]);
          }
          setInput(words.slice(0, -1).join(' ') + (words.length > 1 ? ' ' : ''));
          return;
        }
      } else {
        addTag(val.slice(0, -1));
        return;
      }
    }
    setInput(val);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (hashOnly && e.key === "Enter" && !input.startsWith('#')) {
      e.preventDefault();
      onSubmit?.();
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  return (
    <div
      className={clsx(
        "flex flex-wrap items-center gap-1 border border-border rounded-2xl px-3 min-h-9 text-sm bg-white transition-all focus-within:ring-2 ring-sky-400/20",
        className,
      )}
    >
      {value.map((tag, idx) => (
        <span
          key={`${tag}-${idx}`}
          className="flex items-center gap-1 px-2 py-0.5 bg-zinc-100 text-zinc-700 rounded-xl"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(idx)}
            className="text-zinc-500 hover:text-zinc-700 cursor-pointer"
          >
            <XIcon size={12} weight="bold" />
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={() => addTag(input)}
        placeholder={value.length === 0 && !input ? placeholder : ""}
        className="flex-1 min-w-20 h-9 bg-transparent outline-none placeholder:text-zinc-400"
      />
      {suffixIcon && (
        <button type="submit" className="shrink-0 cursor-pointer">
          {suffixIcon}
        </button>
      )}
    </div>
  );
};
