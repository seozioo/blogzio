'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { InputField } from '../InputField';
import { CategoryBox } from '../Categorybox';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

type Inputs = {
  category?: string;
  query: string;
};

export type SearchFormProps = Readonly<{
  className?: string;
  showCategory?: boolean;
}>;

export const SearchForm = (props: SearchFormProps) => {
  const { register, handleSubmit, setValue } = useForm<Inputs>();
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.query.trim()) {
      const params = new URLSearchParams({ q: data.query.trim() });
      if (data.category) {
        params.set('category', data.category);
      }
      router.push(`/search?${params}`);
    }
  };

  const form = (
    <form
      className={props.showCategory ? 'w-full' : props.className}
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        className="w-full"
        placeholder="검색"
        {...register('query')}
        suffixIcon={
          <MagnifyingGlassIcon
            className="text-zinc-400"
            size={20}
            weight="bold"
          />
        }
      />
    </form>
  );

  if (!props.showCategory) return form;

  return (
    <div className={props.className}>
      <CategoryBox
        placeholder="전체"
        showClear
        onChange={(opt) => setValue('category', opt.id)}
        onClear={() => setValue('category', undefined)}
      />
      {form}
    </div>
  );
};
