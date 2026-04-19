"use client";

import { BaseContainer } from "@/shared/components/BaseContainer";
import { Button } from "@/shared/components/Button";
import { EditorSelect } from "@/shared/components/Combobox";
import { InputField } from "@/shared/components/InputField";
import {
  LinkIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react";
import { SubmitEventHandler, useState } from "react";
import { VisibilityToggle } from "@/shared/components/ToggleButton";
import { Categorybox } from "@/shared/components/Categorybox";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import clsx from "clsx";
import { Toggle, ToggleGroup } from "@base-ui/react";
import { Placeholder } from "@tiptap/extensions";
import { Editor } from "@tiptap/core";
import { TextStyle } from "@tiptap/extension-text-style";
import FontSize from "@tiptap/extension-text-style/font-size";
import { useEditorState } from "@tiptap/react";
import FontFamily from "@tiptap/extension-font-family";


export default function Write() {
  const [categoryId, setCategoryId] = useState<string>("");
  const [isVisible, setIsVisible] = useState(true);

  const FONT_SIZE_OPTIONS = [
    { label: "6px", value: "6px" },
    { label: "8px", value: "8px" },
    { label: "10px", value: "10px" },
    { label: "12px", value: "12px" },
    { label: "14px", value: "14px" },
    { label: "16px", value: "16px" },
    { label: "18px", value: "18px" },
    { label: "24px", value: "24px" },
    { label: "36px", value: "36px" },
    { label: "42px", value: "42px" },
  ];

  const FONT_TYPE_OPTIONS = [
    { label: "Inter", value: "Inter" },
    { label: "Pretendard", value: "Pretendard" },
    { label: "serif", value: "serif" },
    { label: "monospace", value: "monospace" },
    { label: "cursive", value: "cursive" },
  ]

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const tags = (formData.get("tags") as string)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    await fetch("/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content: editor?.getJSON(),
        categoryId: categoryId || null,
        tags,
        isVisible,
        pinned: false,
      }),
    });
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "내용을 입력하세요...",
      }),
      TextStyle,
      FontSize,
      FontFamily,
    ],
    editorProps: {
      attributes: {
        class:
          "w-full min-h-100 flex-1 resize-none field-sizing-content outline-none",
      },
    },
    content: "",
    immediatelyRender: false,
  });

  const fontSize = useEditorState({
    editor,
    selector: ({ editor }) => {
      return editor?.getAttributes("textStyle").fontSize || "16px";
    },
  });

  const fontType = useEditorState({
    editor,
    selector: ({ editor }) => {
      return editor?.getAttributes("textStyle").fontFamily || "Pretendard";
    }
  })
  return (
    <BaseContainer className="w-full mt-5 py-10">
      <div>
        <div className="flex items-center gap-2">


          <EditorSelect
            editor={editor}
            value={fontType}
            options={FONT_TYPE_OPTIONS}
            onSelect={(value, editor) => {
              if (!value) {
                editor.chain().focus().unsetFontFamily().run();
              } else {
                editor.chain().focus().setFontFamily(value).run();
              }
            }}
          />

          <EditorSelect
            editor={editor}
            value={fontSize}
            options={FONT_SIZE_OPTIONS}
            onSelect={(value, editor) => {
              if (!value) {
                editor.chain().focus().unsetFontSize().run();
              } else {
                editor.chain().focus().setFontSize(value).run();
              }
            }}
          />

          <div className="w-px h-6 bg-border" />
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={clsx(
              "border border-border w-8 h-8 rounded-lg hover:bg-zinc-100 active:bg-zinc-200 active:[box-shadow:inset_0_2px_0_rgba(0,0,0,0.2)]",
              editor?.isActive("bold") && "bg-zinc-200",
            )}
          >
            <TextBIcon
              className="m-auto text-zinc-600"
              size={24}
              weight="bold"
            />
          </button>

          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={clsx(
              "border border-border w-8 h-8 rounded-lg hover:bg-zinc-100 active:bg-zinc-200 active:[box-shadow:inset_0_2px_0_rgba(0,0,0,0.2)]",
              editor?.isActive("italic") && "bg-zinc-200",
            )}
          >
            <TextItalicIcon
              className="m-auto text-zinc-600"
              size={24}
              weight="bold"
            />
          </button>

          <button
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={clsx(
              "border border-border w-8 h-8 rounded-lg hover:bg-zinc-100 active:bg-zinc-200 active:[box-shadow:inset_0_2px_0_rgba(0,0,0,0.2)]",
              editor?.isActive("underline") && "bg-zinc-200",
            )}
          >
            <TextUnderlineIcon
              className="m-auto text-zinc-600"
              size={24}
              weight="bold"
            />
          </button>

          <button
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            className={clsx(
              "border border-border w-8 h-8 rounded-lg hover:bg-zinc-100 active:bg-zinc-200 active:[box-shadow:inset_0_2px_0_rgba(0,0,0,0.2)]",
              editor?.isActive("strike") && "bg-zinc-200",
            )}
          >
            <TextStrikethroughIcon
              className="m-auto text-zinc-600"
              size={24}
              weight="bold"
            />
          </button>

          <div className="w-px h-6 bg-border" />

          <div></div>
          <Button variant="link" size="icon">
            <LinkIcon size={24} weight="bold" />
          </Button>

          <div className="w-px h-6 bg-border" />
          <ToggleGroup
            defaultValue={["left"]}
            className="flex gap-1 bg-zinc-200 rounded-[10px] p-0.5"
          >
            <Toggle
              aria-label="Align left"
              value="left"
              onPressedChange={() =>
                editor?.chain().focus().setTextAlign("left").run()
              }
              className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 hover:bg-zinc-100 data-pressed:bg-white"
            >
              <TextAlignLeftIcon size={24} weight="bold" />
            </Toggle>

            <Toggle
              aria-label="Align center"
              value="center"
              onPressedChange={() =>
                editor?.chain().focus().setTextAlign("center").run()
              }
              className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 hover:bg-zinc-100 data-pressed:bg-white"
            >
              <TextAlignCenterIcon size={24} weight="bold" />
            </Toggle>

            <Toggle
              aria-label="Align right"
              value="right"
              onPressedChange={() =>
                editor?.chain().focus().setTextAlign("right").run()
              }
              className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 hover:bg-zinc-100 data-pressed:bg-white"
            >
              <TextAlignRightIcon size={24} weight="bold" />
            </Toggle>

            <Toggle
              aria-label="Justify"
              value="justify"
              onPressedChange={() =>
                editor?.chain().focus().setTextAlign("justify").run()
              }
              className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 hover:bg-zinc-100 data-pressed:bg-white"
            >
              <TextAlignJustifyIcon size={24} weight="bold" />
            </Toggle>
          </ToggleGroup>
        </div>

        <div>
          <form id="postForm" onSubmit={handleSubmit}>
            <div className="border border-border flex flex-col rounded-2xl px-10 py-8 my-5">
              <input
                name="title"
                className="font-semibold text-[24px] w-full outline-none"
                placeholder="제목"
              />
              <hr className="my-4 border-t border-border" />

              <EditorContent editor={editor} name="content" />
            </div>

            <div className="flex items-center gap-5">
              <Categorybox placeholder="카테고리" onChange={(opt) => setCategoryId(opt.value)} />
              <InputField name="tags" className="flex-1" placeholder="태그" />
              <VisibilityToggle onChange={(v) => setIsVisible(v === "public")} />
              <div className="w-px h-6 bg-border" />
              <Button>게시</Button>
            </div>

          </form>
        </div>
      </div>
    </BaseContainer>
  );
}

