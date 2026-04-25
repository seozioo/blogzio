'use client';

import { BaseContainer } from '@/shared/components/BaseContainer';
import { Button } from '@/shared/components/Button';
import { EditorSelect } from '@/shared/components/Combobox';
import { InputField } from '@/shared/components/InputField';
import {
  ImageIcon,
  LinkIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  TextBIcon,
  TextItalicIcon,
  TextStrikethroughIcon,
  TextUnderlineIcon,
} from '@phosphor-icons/react';
import { SubmitEventHandler, useState } from 'react';
import { VisibilityToggle } from '@/shared/components/ToggleButton';
import { CategoryBox } from '@/shared/components/Categorybox';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import clsx from 'clsx';
import { Toggle, ToggleGroup } from '@base-ui/react';
import { Editor } from '@tiptap/core';
import { CategoryCreateDialog } from '@/shared/components/posts/CategoryCreateDialog';
import { LinkCreateDialog } from '@/shared/components/posts/LinkCreateDialog';
import { apiClient } from '@/constants/api-client';
import { ImageCreateDialog } from '@/shared/components/posts/ImageCreateDialog';
import { editorExtensions } from '@/shared/lib/editor-extensions';
import { useRouter } from 'next/navigation';

export default function Write() {
  const [categoryId, setCategoryId] = useState<string>('');
  const [isVisible, setIsVisible] = useState(true);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const FONT_SIZE_OPTIONS = [
    { label: '6px', value: '6px' },
    { label: '8px', value: '8px' },
    { label: '10px', value: '10px' },
    { label: '12px', value: '12px' },
    { label: '14px', value: '14px' },
    { label: '16px', value: '16px' },
    { label: '18px', value: '18px' },
    { label: '24px', value: '24px' },
    { label: '36px', value: '36px' },
    { label: '42px', value: '42px' },
  ];

  const FONT_TYPE_OPTIONS = [
    { label: 'Inter', value: 'Inter' },
    { label: 'Pretendard', value: 'Pretendard' },
    { label: 'serif', value: 'serif' },
    { label: 'monospace', value: 'monospace' },
    { label: 'cursive', value: 'cursive' },
  ];

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const tags = (formData.get('tags') as string)
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    setSubmitting(true);
    const { data, error } = await apiClient.POST('/post', {
      headers: { 'Content-Type': 'application/json' },
      body: {
        title,
        content: editor?.getJSON(),
        categoryId,
        tags,
        isVisible,
        pinned: false,
      },
    });

    if (error) {
      alert(error);
      setSubmitting(false);
      return;
    }

    if (data?.id) {
      router.push(`/post/${data.id}`);
      return;
    }

    setSubmitting(false);
  };

  const editor = useEditor({
    extensions: editorExtensions,
    editorProps: {
      attributes: {
        class:
          'w-full min-h-100 flex-1 resize-none field-sizing-content outline-none',
      },
    },
    content: '',
    immediatelyRender: false,
  });

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      fontSize: editor?.getAttributes('textStyle').fontSize || '16px',
      fontFamily: editor?.getAttributes('textStyle').fontFamily || 'Pretendard',
      bold: editor?.isActive('bold') ?? false,
      italic: editor?.isActive('italic') ?? false,
      underline: editor?.isActive('underline') ?? false,
      strike: editor?.isActive('strike') ?? false,
    }),
  });

  if (!editor || !editorState) {
    return null;
  }

  return (
    <BaseContainer className="w-full mt-5 py-10">
      <div>
        <div className="relative overflow-hidden">
          <div className="base:-left-4 pointer-events-none absolute inset-y-0 left-0 w-4 bg-linear-to-r from-35% from-zinc-50 to-transparent z-10 transition-all" />
          <div className="base:-right-4 pointer-events-none absolute inset-y-0 right-0 w-4 bg-linear-to-l from-35% from-zinc-50 to-transparent z-10 transition-all" />
          <div className="flex items-center gap-2 overflow-x-auto max-base:px-4 transition-[padding] scrollbar-hide *:shrink-0">
            <EditorSelect
              editor={editor}
              value={editorState.fontFamily}
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
              value={editorState.fontSize}
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
                'hover:border active:border border-border w-8 h-8 rounded-lg hover:bg-white active:bg-zinc-200 active:inset-shadow-active-button transition-all',
                editorState.bold && 'bg-zinc-200 border',
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
                'hover:border active:border border-border w-8 h-8 rounded-lg hover:bg-white active:bg-zinc-200 active:inset-shadow-active-button transition-all',
                editorState.italic && 'bg-zinc-200 border',
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
                'hover:border active:border border-border w-8 h-8 rounded-lg hover:bg-white active:bg-zinc-200 active:inset-shadow-active-button transition-all',
                editorState.underline && 'bg-zinc-200 border',
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
                'hover:border active:border border-border w-8 h-8 rounded-lg hover:bg-white active:bg-zinc-200 active:inset-shadow-active-button transition-all',
                editorState.strike && 'bg-zinc-200 border',
              )}
            >
              <TextStrikethroughIcon
                className="m-auto text-zinc-600"
                size={24}
                weight="bold"
              />
            </button>

            <div className="w-px h-6 bg-border" />

            <LinkCreateDialog
              open={linkDialogOpen}
              editor={editor}
              onOpenChange={setLinkDialogOpen}
            ></LinkCreateDialog>

            <Button
              variant="editor"
              size="editor"
              onClick={() => setLinkDialogOpen(true)}
            >
              <LinkIcon size={24} weight="bold" />
            </Button>

            <ImageCreateDialog
              open={imageDialogOpen}
              editor={editor}
              onOpenChange={setImageDialogOpen}
            ></ImageCreateDialog>

            <Button
              variant="editor"
              size="editor"
              onClick={() => setImageDialogOpen(true)}
            >
              <ImageIcon size={24} weight="bold" />
            </Button>

            <div className="w-px h-6 bg-border" />
            <ToggleGroup
              defaultValue={['left']}
              className="flex gap-1 bg-zinc-200 rounded-[10px] p-0.5"
            >
              <Toggle
                aria-label="Align left"
                value="left"
                onPressedChange={() =>
                  editor?.chain().focus().setTextAlign('left').run()
                }
                className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 hover:bg-zinc-100 data-pressed:bg-white"
              >
                <TextAlignLeftIcon size={24} weight="bold" />
              </Toggle>

              <Toggle
                aria-label="Align center"
                value="center"
                onPressedChange={() =>
                  editor?.chain().focus().setTextAlign('center').run()
                }
                className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 hover:bg-zinc-100 data-pressed:bg-white"
              >
                <TextAlignCenterIcon size={24} weight="bold" />
              </Toggle>

              <Toggle
                aria-label="Align right"
                value="right"
                onPressedChange={() =>
                  editor?.chain().focus().setTextAlign('right').run()
                }
                className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 hover:bg-zinc-100 data-pressed:bg-white"
              >
                <TextAlignRightIcon size={24} weight="bold" />
              </Toggle>

              <Toggle
                aria-label="Justify"
                value="justify"
                onPressedChange={() =>
                  editor?.chain().focus().setTextAlign('justify').run()
                }
                className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-600 hover:bg-zinc-100 data-pressed:bg-white"
              >
                <TextAlignJustifyIcon size={24} weight="bold" />
              </Toggle>
            </ToggleGroup>
          </div>
        </div>

        <div>
          <form id="postForm" onSubmit={handleSubmit}>
            <div className="border border-border bg-white flex flex-col rounded-2xl px-4 py-4 my-4">
              <input
                name="title"
                className="font-semibold text-[24px] w-full outline-none px-1"
                placeholder="제목"
              />
              <hr className="my-3 border-t border-border" />

              <EditorContent
                editor={editor}
                name="content"
                className="min-h-100 px-1"
              />
            </div>

            <div className="flex max-sm:flex-col items-center max-sm:items-stretch gap-4 max-base:px-4 transition-[padding]">
              <CategoryBox
                placeholder="카테고리"
                onChange={(opt) => setCategoryId(opt.value)}
              />
              <InputField name="tags" className="flex-1" placeholder="태그" />
              <VisibilityToggle
                onChange={(v) => setIsVisible(v === 'public')}
              />
              <div className="h-px max-sm:mx-2 sm:w-px sm:h-6 bg-border" />
              <Button type="submit" loading={submitting}>
                게시
              </Button>
            </div>
          </form>
        </div>
      </div>
    </BaseContainer>
  );
}
