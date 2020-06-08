import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiMail, FiLock, FiUserPlus } from 'react-icons/fi';

import { useAuth } from '../../hooks/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Logo from '../../assets/logo.png';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container } from './styles';

interface SignInCredentials {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, signIn, signOut } = useAuth();

  const handleSubmit = useCallback(
    async (data: SignInCredentials) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    },
    [signIn]
  );

  return (
    <Container>
      <img src={Logo} alt="BrosBarbershop" />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" icon={FiMail} autoFocus placeholder="E-mail" />
        <Input
          name="password"
          type="password"
          icon={FiLock}
          placeholder="Senha"
        />
        <Button>LOGIN</Button>
        <a href="">Esqueci minha senha</a>
      </Form>
      <a href="">
        <FiUserPlus size={20} />
        Criar uma conta grátis
      </a>
    </Container>
  );
};

export default SignIn;
