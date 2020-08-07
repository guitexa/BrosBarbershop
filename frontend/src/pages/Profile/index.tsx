import React, { useCallback, useRef, useState, ChangeEvent } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiUser, FiMail, FiLock, FiArrowLeft, FiCamera } from 'react-icons/fi';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Logo from '../../assets/logo.png';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  ContentEffect,
  Header,
  HeaderContent,
  ProfilePicture,
} from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileCredentials {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const [passwordFilled, setPasswordFilled] = useState('');

  const formRef = useRef<FormHandles>(null);

  const { user, updateProfile } = useAuth();

  const { addToast } = useToast();
  const history = useHistory();

  const handleAvatarChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const data = new FormData();

        data.append('avatar', event.target.files[0]);

        api.patch('/users/avatar', data).then((response) => {
          updateProfile(response.data);
        });

        addToast({
          type: 'success',
          title: 'Avatar atualizado com sucesso!',
        });
      }
    },
    []
  );

  const handleSubmit = useCallback(
    async (data: ProfileCredentials) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape(
          {
            name: Yup.string(),
            email: Yup.string().email('Digite um e-mail válido'),
            old_password: Yup.string().when(
              ['password', 'password_confirmation'],
              {
                is: (val) => !!val,
                then: Yup.string().required('Digite a senha atual'),
              }
            ),
            password: Yup.string().when(
              ['old_password', 'password_confirmation'],
              {
                is: (val) => !!val,
                then: Yup.string().min(6, 'Senha deve ter no mínimo 6 dígitos'),
              }
            ),
            password_confirmation: Yup.string()
              .when(['old_password', 'password'], {
                is: (val) => !!val,
                then: Yup.string().required(),
              })
              .oneOf([Yup.ref('password')], 'Senha redigitada não confere'),
          },
          [
            ['old_password', 'password'],
            ['old_password', 'password_confirmation'],
            ['password', 'password_confirmation'],
          ]
        );

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          ...(name ? { name } : {}),
          ...(email ? { email } : {}),
          ...(name && email ? { name, email } : {}),
          ...(name && old_password
            ? { name, old_password, password, password_confirmation }
            : {}),
          ...(email && old_password
            ? { email, old_password, password, password_confirmation }
            : {}),
          ...(name && email && old_password
            ? { name, email, old_password, password, password_confirmation }
            : {}),
          ...(old_password
            ? { old_password, password, password_confirmation }
            : {}),
        };

        if (Object.entries(formData).length === 0) {
          return addToast({
            type: 'error',
            title:
              'Para atualizar seu cadastro você deve preencher algum dos campos',
          });
        }

        const response = await api.put('/profile', formData);

        updateProfile(response.data);

        addToast({
          type: 'success',
          title: 'Cadastro atualizado com sucesso',
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
    [addToast, history, updateProfile]
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Link to="/dashboard">
            <FiArrowLeft size={25} />
          </Link>
        </HeaderContent>
      </Header>
      <ContentEffect>
        <ProfilePicture>
          <img src={user.avatar_url} alt={user.name} />
          <label htmlFor="avatar">
            <FiCamera />
            <input type="file" id="avatar" onChange={handleAvatarChange} />
          </label>
        </ProfilePicture>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            name="name"
            defaultValue={user.name}
            icon={FiUser}
            autoFocus
            placeholder="Nome"
          />
          <Input
            name="email"
            defaultValue={user.email}
            icon={FiMail}
            placeholder="E-mail"
          />
          <Input
            containerStyle={{ marginTop: '30px' }}
            name="old_password"
            type="password"
            icon={FiLock}
            placeholder="Senha atual"
          />
          <Input
            name="password"
            type="password"
            icon={FiLock}
            placeholder="Nova senha"
            onChange={(e) => setPasswordFilled(e.target.value)}
          />
          {passwordFilled && (
            <Input
              name="password_confirmation"
              type="password"
              icon={FiLock}
              placeholder="Redigite a senha"
            />
          )}
          <Button>ATUALIZAR CADASTRO</Button>
        </Form>
      </ContentEffect>
    </Container>
  );
};

export default Profile;
