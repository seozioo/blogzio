import { XIcon } from "@phosphor-icons/react";
import clsx from "clsx";
import { KeyboardEvent, useState } from "react";

type TagInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
};

export const TagInput = ({
  value,
  onChange,
  placeholder,
  className,
}: TagInputProps) => {
  const [input, setInput] = useState("");

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag) return;
    if (value.includes(tag)) {
      setInput("");
      return;
    }
    onChange([...value, tag]);
    setInput("");
  };

  const removeTag = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  return (
    <div
      className={clsx(
        "flex flex-wrap items-center gap-1 border border-border rounded-2xl px-2 min-h-9 text-sm transition-all focus-within:ring-2 ring-sky-400/20",
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
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addTag(input)}
        placeholder={value.length === 0 ? placeholder : ""}
        className="flex-1 min-w-20 h-9 bg-transparent outline-none placeholder:text-zinc-400"
      />
    </div>
  );
};
