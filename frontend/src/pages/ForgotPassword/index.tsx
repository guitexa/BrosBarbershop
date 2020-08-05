import React, { useRef, useCallback, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { FiMail } from 'react-icons/fi';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Logo from '../../assets/logo.png';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, ContentEffect } from './styles';
import api from '../../services/api';

interface ForgotPasswordCredentials {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordCredentials) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email: data.email,
        });

        addToast({
          type: 'success',
          title: 'E-mail enviado com sucesso',
          description:
            'Verifique o e-mail enviado e siga as instruções para recuperação da senha',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          title: 'Erro na recuperação de senha',
          type: 'error',
          description: 'Verifique o e-mail digitado e tente novamente',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  return (
    <Container>
      <ContentEffect>
        <img src={Logo} alt="BrosBarbershop" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="email" icon={FiMail} autoFocus placeholder="E-mail" />
          <Button loading={loading}>RECUPERAR</Button>
        </Form>
        <Link to="/">
          <MdKeyboardBackspace size={25} />
          Voltar para página de login
        </Link>
      </ContentEffect>
    </Container>
  );
};

export default ForgotPassword;
