import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Logo from '../../assets/logo.png';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, ContentEffect } from './styles';

interface DataForm {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: DataForm) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Senha deve ter no mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        addToast({
          type: 'success',
          title: 'Usuário cadastrado com sucesso',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          title: 'Erro no cadastro',
          type: 'error',
          description: 'Verifique os dados e tente novamente',
        });
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <ContentEffect>
        <img src={Logo} alt="BrosBarbershop" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" icon={FiUser} autoFocus placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Senha"
          />
          <Button>CRIAR CONTA GRÁTIS</Button>
        </Form>
        <Link to="/">
          <MdKeyboardBackspace size={25} />
          Voltar para página de login
        </Link>
      </ContentEffect>
    </Container>
  );
};

export default SignUp;
