"use client";

import { BaseContainer } from "@/shared/components/BaseContainer";
import { Button } from "@/shared/components/Button";
import { ComboboxSelect } from "@/shared/components/Combobox";
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
import { SubmitEventHandler, useCallback } from "react";
import { VisibilityToggle } from "@/shared/components/ToggleButton";
import { Categorybox } from "@/shared/components/Categorybox";
import { PostToggleGroup } from "@/shared/components/ToggleGroup";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import clsx from "clsx";
import { Toggle, ToggleGroup } from "@base-ui/react";

export default function Write() {
  const handleClick = useCallback(() => {}, []);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const data = Object.fromEntries(formData.entries());

    await fetch("/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  };

  const categories = [
    { name: "여행", slug: "travel", sortOrder: 1, type: "LIST" },
    { name: "Photo", slug: "photo", sortOrder: 2, type: "GALLERY" },
  ];

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
    immediatelyRender: false,
  });

  return (
    <BaseContainer className="w-full mt-5 py-10">
      <div>
        <div className="flex items-center gap-2">
          <ComboboxSelect
            options={[
              { label: "Pretendard", value: "pretendard" },
              { label: "이글자가보이나요", value: "arial" },
            ]}
            defaultValue={{ label: "Pretendard", value: "pretendard" }}
          />
          <ComboboxSelect
            options={[{ label: "Bold", value: "Bold" }]}
            defaultValue={{ label: "Bold", value: "Bold" }}
          />
          <ComboboxSelect
            options={[{ label: "14", value: "14" }]}
            defaultValue={{ label: "14", value: "14" }}
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
            <div className="border border-border flex flex-col min-h-125 rounded-2xl px-10 py-8 my-5">
              <input
                name="title"
                className="font-semibold text-[24px] w-full outline-none"
                placeholder="제목"
              />
              <hr className="my-4 border-t border-border" />

              <EditorContent
                editor={editor}
                name="content"
                className="w-full flex-1 resize-none field-sizing-content outline-none"
              />
            </div>
            <div className="flex items-center gap-5">
              <Categorybox
                options={categories.map((c) => ({
                  label: c.name,
                  value: c.slug,
                }))}
                placeholder="카테고리"
              />
              <InputField name="tags" className="flex-1" placeholder="태그" />
              <VisibilityToggle />
              <div className="w-px h-6 bg-border" />
              <Button>게시</Button>
            </div>
          </form>
        </div>
      </div>
    </BaseContainer>
  );
}

// BaseDialog

// 위쪽 버튼 해당 페이지 독단
//className="border border-border rounded-2xl px-10 py-8"
// input이랑 button

// category type이 GALLERY일 경우 사진 파일이 없을 경우
// 버튼 새로 만들기

// 정렬 버튼 클릭시 이동 애니메이션 모션
// 폰트 목록 지정값 넣기

// https://phosphoricons.com
// https://base-ui.com/react/components/combobox

// inset-shadow-button active:inset-shadow-active-button -> 버튼 그림자 넣기
/* <button className="border border-border w-8 h-8 rounded-lg hover:bg-zinc-100 active:bg-zinc-200  active:[box-shadow:inset_0_2px_0_rgba(0,0,0,0.2)]">
            <TextBIcon
              className="m-auto text-zinc-600"
              size={24}
              weight="bold"
            />
          </button>
          <button className="border border-border w-8 h-8 rounded-lg hover:bg-zinc-100 active:bg-zinc-200  active:[box-shadow:inset_0_2px_0_rgba(0,0,0,0.2)]">
            <TextItalicIcon
              className="m-auto text-zinc-600"
              size={24}
              weight="bold"
            />
          </button>

          <button className="border border-border w-8 h-8 rounded-lg hover:bg-zinc-100 active:bg-zinc-200  active:[box-shadow:inset_0_2px_0_rgba(0,0,0,0.2)]">
            <TextUnderlineIcon
              className="m-auto text-zinc-600"
              size={24}
              weight="bold"
            />
          </button>
          <button className="border border-border w-8 h-8 rounded-lg hover:bg-zinc-100 active:bg-zinc-200  active:[box-shadow:inset_0_2px_0_rgba(0,0,0,0.2)]">
            <TextStrikethroughIcon
              className="m-auto text-zinc-600"
              size={24}
              weight="bold"
            />
          </button> */
