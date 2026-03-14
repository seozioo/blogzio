import { SubmitHandler, useForm } from 'react-hook-form';
import { apiClient } from '../hooks/use-api';

type Inputs = {
  content: string;
  backgroundColor: "WHITE" | "PINK" | "YELLOW" | "LIME" | "SKY";
};

export type GuestbookInputProps = Readonly<{
    onSubmit?: VoidFunction
}>

export const GuestbookInput = (props: GuestbookInputProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await apiClient.POST('/guestbook', { body: {
        nickname: '익명',
        password: '1234',
        contentType: "TEXT",
        content: data.content,
        backgroundColor: data.backgroundColor,
    } });
    props.onSubmit?.();
  };

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      <textarea
        placeholder="방명록을 남겨주세요!"
        className="w-75 min-h[66px] max-h-75 rounded-2xl border border-gray-300 px-5 py-6"
        {...register('content', { required: true })}
      />
      <select className="w-75 mt-2 px-5 py-2 border border-gray-300 rounded" {...register('backgroundColor')}>
        <option value="WHITE">화이트</option>
        <option value="PINK">핑크</option>
        <option value="YELLOW">옐로우</option>
        <option value="LIME">라임</option>
        <option value="SKY">스카이</option>
      </select>
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        등록
      </button>
    </form>
  );
};
