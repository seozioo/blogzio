'use client';

import { apiClient } from '@/constants/api-client';
import { BaseContainer } from '@/shared/components/BaseContainer';
import { Button } from '@/shared/components/Button';
import { InputField } from '@/shared/components/InputField';
import { useAuth } from '@/shared/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

  const { setToken } = useAuth();

  useEffect(() => {
    apiClient.GET('/user/admin-exists').then((response) => {
      if (!response.data?.exists) {
        router.push('/register');
      }
    });
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await apiClient.POST('/auth/login', { body: data });

    if (response.error) {
      alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      return;
    }

    setToken(response.data?.accessToken ?? null);
    router.back();
  };

  return (
    <BaseContainer className="flex-1 flex flex-col items-center justify-center">
      <form
        className="flex flex-col gap-5 bg-white border border-gray-200 rounded-2xl px-5 py-6 max-w-md w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          placeholder="아이디"
          errors={errors.username}
          {...register('username', {
            required: { message: '아이디는 필수입니다.', value: true },
          })}
        />
        <InputField
          type="password"
          placeholder="비밀번호"
          errors={errors.password}
          {...register('password', {
            required: { message: '비밀번호는 필수입니다.', value: true },
          })}
        />
        <Button type="submit" title="Log In">
          로그인
        </Button>
      </form>
    </BaseContainer>
  );
}
