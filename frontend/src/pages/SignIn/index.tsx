import React from 'react';
import { FiMail, FiLock, FiUserPlus } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Logo from '../../assets/logo.png';

import { Container } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <img src={Logo} alt="BrosBarbershop" />
      <form>
        <Input
          name="email"
          type="email"
          icon={FiMail}
          autoFocus
          placeholder="E-mail"
        />
        <Input name="email" type="password" icon={FiLock} placeholder="Senha" />
        <Button>LOGIN</Button>
        <a href="">Esqueci minha senha</a>
      </form>
      <a href="">
        <FiUserPlus size={20} />
        Criar uma conta grátis
      </a>
    </Container>
  );
};

export default SignIn;
