import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { apiClient } from '../../hooks/use-api';
import { BaseDialog } from '../BaseDialog';
import { InputField } from '../InputField';
import { Combobox } from '@base-ui/react';
import { CaretDownIcon } from '@phosphor-icons/react';

type Inputs = {
  name: string;
  slug: string;
  type: 'GALLERY' | 'LIST';
};

export type CategoryCreateDialogProps = Readonly<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate?: VoidFunction;
}>;

export const CategoryCreateDialog = ({
  open,
  onOpenChange,
  onCreate,
}: CategoryCreateDialogProps) => {
  const { register, reset, handleSubmit, setValue, watch } = useForm<Inputs>({
    defaultValues: { type: 'GALLERY' },
  });

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { error } = await apiClient.POST('/category', {
      body: data,
    });

    if (error) {
      alert('카테고리 생성에 실패했습니다.');
      return;
    }

    onCreate?.();
    onOpenChange(false);
  };

  const options = [
    { label: '갤러리', value: 'GALLERY' },
    { label: '리스트', value: 'LIST' },
  ];

  const longestLabel = options.reduce(
    (acc, option) => (option.label.length > acc.length ? option.label : acc),
    '',
  );

  return (
    <BaseDialog
      popupClassName="w-full max-w-xs"
      open={open}
      onOpenChange={onOpenChange}
      title="카테고리 생성"
    >
      <form
        className="flex flex-col items-stretch"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <InputField
            className="w-full"
            placeholder="이름"
            {...register('name', { required: true })}
          />
          <InputField
            className="w-full"
            placeholder="슬러그"
            {...register('slug', { required: true })}
          />
          <Combobox.Root
            items={options}
            value={watch('type')}
            onValueChange={(value) => setValue('type', value ?? 'GALLERY')}
            itemToStringLabel={(v) =>
              options.find((o) => o.value === v)?.label ?? ''
            }
          >
            <Combobox.InputGroup className="flex items-center h-9 px-2 rounded-2xl border border-border bg-white inset-shadow-button active:inset-shadow-active-button transition-all appearance-none">
              <Combobox.Input
                className="px-1 w-full outline-none text-[14px] text-zinc-600 field-sizing-content cursor-pointer"
                placeholder="타입"
                readOnly
              />
              <Combobox.Trigger className="flex items-center">
                <CaretDownIcon weight="fill" />
              </Combobox.Trigger>
            </Combobox.InputGroup>

            <Combobox.Portal>
              <Combobox.Positioner>
                <Combobox.Popup
                  className="px-1 bg-white border border-border rounded-xl shadow-sm overflow-hidden"
                  style={{ minWidth: `${longestLabel.length * 14}px` }}
                >
                  <Combobox.List>
                    {options.map((option) => (
                      <Combobox.Item
                        key={option.value}
                        value={option.value}
                        className="px-4 py-2 text-sm text-center text-zinc-600 hover:bg-zinc-50 cursor-pointer"
                      >
                        {option.label}
                      </Combobox.Item>
                    ))}
                  </Combobox.List>
                </Combobox.Popup>
              </Combobox.Positioner>
            </Combobox.Portal>
          </Combobox.Root>
        </div>

        <BaseDialog.Actions>
          <BaseDialog.Close>취소</BaseDialog.Close>
          <BaseDialog.Submit>생성</BaseDialog.Submit>
        </BaseDialog.Actions>
      </form>
    </BaseDialog>
  );
};
