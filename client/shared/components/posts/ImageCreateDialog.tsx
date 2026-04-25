import { SubmitEventHandler, useRef, useState } from 'react';
import { BaseDialog } from '../BaseDialog';
import { Editor } from '@tiptap/react';
import {
  allowedImageMimeTypes,
  uploadImageAndInsert,
} from '@/shared/utils/upload-image';

export type ImageCreateDialogProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editor: Editor | null;
}>;

export const ImageCreateDialog = ({
  open,
  onOpenChange,
  editor,
}: ImageCreateDialogProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
    } else {
      setPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    }
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!editor) return;

    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      await uploadImageAndInsert(editor, file);

      setPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      onOpenChange(false);
    } finally {
      setUploading(false);
    }
  };

  return (
    <BaseDialog
      popupClassName="w-full max-w-xs [&_h2]:sr-only"
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setPreview((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return null;
          });
        }
        onOpenChange(v);
      }}
      title="이미지 삽입"
    >
      <form
        className="flex flex-col items-stretch gap-3"
        onSubmit={handleSubmit}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={allowedImageMimeTypes.join(',')}
          onChange={handleFileChange}
          className="text-sm text-zinc-600 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-zinc-700 hover:file:bg-zinc-200"
        />
        {preview && (
          <img
            src={preview}
            alt="미리보기"
            className="max-h-48 rounded-lg border border-zinc-200 object-contain"
          />
        )}
        <BaseDialog.Actions>
          <BaseDialog.Close>취소</BaseDialog.Close>
          <BaseDialog.Submit>
            {uploading ? '업로드 중...' : '삽입'}
          </BaseDialog.Submit>
        </BaseDialog.Actions>
      </form>
    </BaseDialog>
  );
};
