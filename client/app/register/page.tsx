'use client';

import { BaseContainer } from '@/shared/components/BaseContainer';
import { Button } from '@/shared/components/Button';
import { InputField } from '@/shared/components/InputField';
import { apiClient, useApi } from '@/shared/hooks/use-api';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
};

export default function Signup() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await apiClient.POST('/user/signup', { body: data });

    if (response.error) {
      alert('회원가입에 실패했습니다. 입력한 정보를 확인해주세요.');
      return;
    }

    alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
    window.location.href = '/login';
  };

  return (
    <BaseContainer className="flex-1 flex items-center justify-center">
      <form
        className="flex flex-col gap-5 bg-white border border-gray-200 rounded-2xl px-5 py-6 w-md"
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
          type="email"
          placeholder="이메일"
          errors={errors.email}
          {...register('email', {
            required: { message: '이메일은 필수입니다.', value: true },
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
        <InputField
          type="password"
          placeholder="비밀번호 확인"
          errors={errors.passwordConfirm}
          {...register('passwordConfirm', {
            required: { message: '비밀번호가 일치하지 않습니다.', value: true },
            validate: (value) =>
              value === watch('password') || '비밀번호가 일치하지 않습니다.',
          })}
        />
        <Button type="submit" title="Sign Up">
          회원가입
        </Button>
      </form>
    </BaseContainer>
  );
}
