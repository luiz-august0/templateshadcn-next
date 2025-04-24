import { changePassword } from '@/core/recovery/services/recovery';
import { successToast } from '@/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StepProps } from '../types';
import schemaValidation from './schemaValidation';
import PasswordInput from '@/components/customized/PasswordInput/PasswordInput';

type FormProps = {
  password: string;
  confirmPassword: string;
};

export const useRecoveryStep = (recoveryToken: string, onSuccess: () => void): StepProps => {
  const form = useForm<FormProps>({
    resolver: yupResolver(schemaValidation),
  });
  const {
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    watch,
    setValue,
  } = form;
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormProps) => {
    setLoading(true);

    await changePassword({
      password: data.password,
      token: recoveryToken,
    })
      .then(() => {
        successToast('Nova senha criada com sucesso!');
        setLoading(false);
        onSuccess();
      })
      .catch(() => setLoading(false));
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    title: 'Recuperação de senha',
    subtitle: 'Informe uma nova senha de acesso',
    buttonText: 'Criar nova senha',
    loading,
    clearErrors,
    reset,
    fields: (
      <>
        <PasswordInput
          value={watch('password')}
          onChange={(e) => setValue('password', e.target.value)}
          required
          id="password"
          name="password"
          autoFocus
          label="Senha"
          error={errors.password?.message}
        />
        <PasswordInput
          value={watch('confirmPassword')}
          onChange={(e) => setValue('confirmPassword', e.target.value)}
          required
          id="confirmPassword"
          name="confirmPassword"
          autoFocus
          label="Confirmar senha"
          error={errors.confirmPassword?.message}
        />
      </>
    ),
  };
};
