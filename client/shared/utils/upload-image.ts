import { apiClient } from '@/constants/api-client';
import { Editor } from '@tiptap/core';

export const allowedImageMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
] as const;

export async function uploadImage(file: File) {
  const { data } = await apiClient.POST('/asset', {
    body: { file } as any,
    bodySerializer: (body: any) => {
      const formData = new FormData();
      formData.append('file', body.file);
      return formData;
    },
  });

  return data?.url;
}

export async function uploadImageAndInsert(
  editor: Editor,
  file: File,
  position?: number,
) {
  const url = await uploadImage(file);

  if (url) {
    if (position !== undefined) {
      editor
        .chain()
        .focus()
        .insertContentAt(position, {
          type: 'image',
          attrs: { src: url },
        })
        .run();
    } else {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }
}
