'use client';

import { useState } from 'react';
import { TagInput } from '../TagInput';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useRouter } from 'next/navigation';
import { CategoryBox } from '../CategoryBox';

export type SearchFormProps = Readonly<{
  className?: string;
  showCategory?: boolean;
  defaultQuery?: string;
  defaultTags?: string[];
}>;

export const SearchForm = (props: SearchFormProps) => {
  const [query, setQuery] = useState(props.defaultQuery ?? '');
  const [tags, setTags] = useState<string[]>(props.defaultTags ?? []);
  const [category, setCategory] = useState<string>();
  const router = useRouter();

  const submit = () => {
    const q = query.trim();
    if (!q && tags.length === 0) return;

    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (category) params.set('category', category);
    tags.forEach((tag) => params.append('tag', tag));
    router.push(`/search?${params}`);
  };

  const form = (
    <form
      className={props.showCategory ? 'w-full' : props.className}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <TagInput
        className="w-full"
        value={tags}
        onChange={setTags}
        text={query}
        onTextChange={setQuery}
        onSubmit={submit}
        placeholder="검색어 또는 #태그"
        hashOnly
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
        onChange={(opt) => setCategory(opt.id)}
        onClear={() => setCategory(undefined)}
      />
      {form}
    </div>
  );
};
