'use client';

import { BaseContainer } from '@/shared/components/BaseContainer';
import { InputField } from '@/shared/components/InputField';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  email: string;
  username: string;
  password: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await fetch('api/user/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <BaseContainer className="flex-1 flex items-center justify-center">
      <form
        className="flex flex-col gap-5 bg-white border border-gray-200 rounded-2xl px-5 py-6 w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        {(errors.username || errors.email || errors.password) && (
          <div>
            {errors.username && <p>Username is required</p>}
            {errors.email && <p>Email is required</p>}
            {errors.password && <p>Password is required</p>}
          </div>
        )}
        <InputField
          placeholder="Username"
          errors={errors.username}
          {...register('username', { required: true })}
        />
        <InputField
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
        />
        <InputField
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
        />
        <button
          className="border border-gray-300 rounded-2xl px-3 h-9 text-sm"
          type="submit"
          title="Sign Up"
        >
          회원가입
        </button>
      </form>
    </BaseContainer>
  );
}
