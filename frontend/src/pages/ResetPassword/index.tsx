import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiLock } from 'react-icons/fi';
import api from '../../services/api';
import { useHistory, useLocation } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Logo from '../../assets/logo.png';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, ContentEffect } from './styles';

interface ResetPasswordCredentials {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();
  const location = useLocation();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordCredentials) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string()
            .required('Senha obrigatória')
            .min(6, 'Senha deve ter no mínimo 6 dígitos'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password')],
            'Senha redigitada não confere'
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password: data.password,
          password_confirmation: data.password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Senha alterada com sucesso',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          title: 'Erro na alteração da senha',
          type: 'error',
          description: 'Verifique as senhas digitadas e tente novamente',
        });
      }
    },
    [addToast, history, location]
  );

  return (
    <Container>
      <ContentEffect>
        <img src={Logo} alt="BrosBarbershop" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="password"
            type="password"
            icon={FiLock}
            autoFocus
            placeholder="Nova senha"
          />
          <Input
            name="password_confirmation"
            type="password"
            icon={FiLock}
            placeholder="Redigite a senha"
          />
          <Button>RESETAR SENHA</Button>
        </Form>
      </ContentEffect>
    </Container>
  );
};

export default ResetPassword;
