import { StarterKit } from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import FontSize from '@tiptap/extension-text-style/font-size';
import FontFamily from '@tiptap/extension-font-family';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Placeholder } from '@tiptap/extensions';
import FileHandler from '@tiptap/extension-file-handler';
import {
  allowedImageMimeTypes,
  uploadImageAndInsert,
} from '@/shared/utils/upload-image';

/** 서버/클라이언트 공용 — 콘텐츠 렌더링에 필요한 extensions */
export const baseExtensions = [
  StarterKit,
  Underline,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  TextStyle,
  FontSize,
  FontFamily,
  Link.configure({ openOnClick: false }),
  Image,
];

/** 클라이언트 전용 — 편집 기능 포함 */
export const editorExtensions = [
  ...baseExtensions,
  Placeholder.configure({
    placeholder: '내용을 입력하세요...',
  }),
  FileHandler.configure({
    allowedMimeTypes: [...allowedImageMimeTypes],
    onDrop: (editor, files, pos) => {
      for (const file of files) {
        uploadImageAndInsert(editor, file, pos);
      }
    },
    onPaste: (editor, files) => {
      for (const file of files) {
        uploadImageAndInsert(editor, file);
      }
    },
  }),
];
