'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { InputField } from '../InputField';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';

type Inputs = {
  query: string;
};

export const SearchForm = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.query.trim()) {
      router.push(`/search?q=${encodeURIComponent(data.query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        className="w-50"
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
};
