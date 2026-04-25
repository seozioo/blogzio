import { apiClient } from '@/constants/api-client';
import { Editor } from '@tiptap/core';

export const allowedImageMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
] as const;

export async function uploadImageAndInsert(
  editor: Editor,
  file: File,
  position?: number,
) {
  const { data } = await apiClient.POST('/asset', {
    body: { file } as any,
    bodySerializer: (body: any) => {
      const formData = new FormData();
      formData.append('file', body.file);
      return formData;
    },
  });

  if (data?.url) {
    if (position !== undefined) {
      editor
        .chain()
        .focus()
        .insertContentAt(position, {
          type: 'image',
          attrs: { src: data.url },
        })
        .run();
    } else {
      editor.chain().focus().setImage({ src: data.url }).run();
    }
  }
}
