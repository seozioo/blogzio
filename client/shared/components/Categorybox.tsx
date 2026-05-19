'use client';

import { Combobox } from '@base-ui/react/combobox';
import { CaretDownIcon, PlusIcon } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import { CategoryCreateDialog } from './posts/CategoryCreateDialog';
import { useApi } from '../hooks/use-api';

type Option = {
  id: string;
  label: string;
  value: string;
};

type Props = {
  placeholder?: string;
  showCreateButton?: boolean;
  showClear?: boolean;
  value?: string;
  onChange?: (value: Option) => void;
  onClear?: () => void;
};

export const CategoryBox = ({
  placeholder,
  showCreateButton,
  showClear,
  value,
  onChange,
  onClear,
}: Props) => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [internalSelectedValue, setInternalSelectedValue] = useState<
    string | null
  >(null);
  const { data, mutate } = useApi('/category');
  const selectedValue =
    value !== undefined ? value || null : internalSelectedValue;

  const options: Option[] = useMemo(
    () =>
      data?.map((c) => ({
        id: c.id!,
        label: c.name!,
        value: c.id!,
      })) ?? [],
    [data],
  );

  const handleValueChange = (value: string | null) => {
    setInternalSelectedValue(value);
    if (value && onChange) {
      const selected = options.find((opt) => opt.id === value);
      if (selected) {
        onChange(selected);
      }
    }
  };

  const handleClear = () => {
    setInternalSelectedValue(null);
    onClear?.();
  };

  const handleCreateCategory = () => {
    setCreateDialogOpen(true);
  };

  const longestLabel = options.reduce(
    (acc, option) => (option.label.length > acc.length ? option.label : acc),
    '',
  );

  return (
    <>
      <CategoryCreateDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onCreate={() => {
          mutate();
        }}
      />
      <Combobox.Root
        items={options}
        value={selectedValue}
        onValueChange={handleValueChange}
        itemToStringLabel={(value) =>
          options.find((v) => v.id === value)?.label ?? ''
        }
      >
        <Combobox.InputGroup className="flex items-center h-9 px-2 rounded-2xl border border-border bg-white inset-shadow-button active:inset-shadow-active-button transition-all appearance-none">
          <Combobox.Input
            className="flex-1 px-1 outline-none text-[14px] text-zinc-600 field-sizing-content cursor-pointer"
            placeholder={placeholder}
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
                {showClear && (
                  <Combobox.Item
                    value=""
                    className="flex items-center justify-center gap-1 px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-50 cursor-pointer"
                    onClick={handleClear}
                  >
                    <span>{placeholder}</span>
                  </Combobox.Item>
                )}
                {options.map((option) => (
                  <Combobox.Item
                    key={option.id}
                    value={option.id}
                    className="px-4 py-2 text-sm text-center text-zinc-600 hover:bg-zinc-50 cursor-pointer"
                  >
                    {option.label}
                  </Combobox.Item>
                ))}
                {showCreateButton && (
                  <Combobox.Item
                    className="flex items-center px-4 py-2 text-sm text-zinc-600 hover:bg-zinc-50 cursor-pointer"
                    onClick={handleCreateCategory}
                  >
                    <PlusIcon size={14} weight="bold" />
                    <span className="px-1">새 카테고리</span>
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    </>
  );
};
