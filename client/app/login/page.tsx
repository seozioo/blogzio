'use client';

import { ApiConfiguration } from '@/constants/api-configuration';
import { BaseContainer } from '@/shared/components/BaseContainer';
import { InputField } from '@/shared/components/InputField';
import { apiClient } from '@/shared/hooks/use-api';
import { AuthControllerApi } from '@blogzio/api';
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await apiClient.POST('/auth/login', { body: data });
  };

  return (
    <BaseContainer className="flex-1 flex items-center justify-center">
      <form
        className="flex flex-col gap-5 bg-white border border-gray-200 rounded-2xl px-5 py-6 w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          {errors.username && <p>Username is required</p>}
          {errors.password && <p>Password is required</p>}
        </div>
        <InputField
          placeholder="Username"
          {...register('username', { required: true })}
        />
        <InputField
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
        />
        <button
          className="border border-gray-300 rounded-2xl px-3 h-9 text-sm"
          type="submit"
          title="Log In"
        >
          로그인
        </button>
      </form>
    </BaseContainer>
  );
}
