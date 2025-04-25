import { SessionLogin } from '@/core/auth/types/models';
import { handlerHttpError, successToast } from '@/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StepProps } from '../types';
import schemaValidation from './schemaValidation';
import PasswordInput from '@/components/customized/PasswordInput/PasswordInput';
import Input from '@/components/customized/Input/Input';

export const useLoginStep = (): StepProps => {
  const router = useRouter();
  const form = useForm<SessionLogin>({
    resolver: yupResolver(schemaValidation),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = form;
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: SessionLogin) => {
    setLoading(true);

    const signInData = {
      login: data.login,
      password: data.password,
    };

    const result = await signIn('credentials', {
      ...signInData,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      handlerHttpError(JSON.parse(result.error));
      return;
    }

    successToast('Login realizado com sucesso!');

    router.replace('/');
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    title: 'Login',
    buttonText: 'Acessar',
    subtitle: 'Informe seus dados abaixo para acessar o sistema',
    loading,
    clearErrors,
    reset,
    fields: (
      <>
        <Input
          {...register('login')}
          required
          id="login"
          label="Login"
          name="login"
          autoFocus
          error={errors.login?.message}
        />
        <PasswordInput
          {...register('password')}
          required
          id="password"
          name="password"
          autoFocus
          label="Senha"
          error={errors.password?.message}
        />
      </>
    ),
  };
};
