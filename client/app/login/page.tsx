'use client';

import { BaseContainer } from '@/shared/components/BaseContainer';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await fetch('/user/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  return (
    <BaseContainer className=''>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Username"
          {...register('username', { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
        />
        <button className="border" type="submit" title="Log In">로그인</button>
      </form>
    </BaseContainer>
  );
}
