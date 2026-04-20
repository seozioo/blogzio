import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BaseDialog } from '../BaseDialog';
import { InputField } from '../InputField';
import { Editor } from '@tiptap/react';

type Inputs = {
  href: string;
};

export type LinkCreateDialogProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editor: Editor | null;
}>;

export const LinkCreateDialog = ({
  open,
  onOpenChange,
  editor,
}: LinkCreateDialogProps) => {
  const { register, reset, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    if (open) {
      const currentHref = editor?.getAttributes('link').href ?? '';
      reset({ href: currentHref });
    }
  }, [open, reset, editor]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!editor) return;

    if (!data.href.trim()) {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: data.href.trim() }).run();
    }

    onOpenChange(false);
  };

  return (
    <BaseDialog
      popupClassName="w-full max-w-xs [&_h2]:sr-only"
      open={open}
      onOpenChange={onOpenChange}
      title="링크 삽입"
    >
      <form
        className="flex flex-col items-stretch"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          className="w-full"
          placeholder="URL"
          {...register('href', { required: true })}
        />
        <BaseDialog.Actions>
          <BaseDialog.Close>취소</BaseDialog.Close>
          <BaseDialog.Submit>삽입</BaseDialog.Submit>
        </BaseDialog.Actions>
      </form>
    </BaseDialog>
  );
};
