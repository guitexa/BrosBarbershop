import React from 'react';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { MdKeyboardBackspace } from 'react-icons/md';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Logo from '../../assets/logo.png';

import { Container } from './styles';

const SignUp: React.FC = () => {
  return (
    <Container>
      <img src={Logo} alt="BrosBarbershop" />
      <form>
        <Input name="name" icon={FiUser} autoFocus placeholder="Nome" />
        <Input name="email" type="email" icon={FiMail} placeholder="E-mail" />
        <Input name="email" type="password" icon={FiLock} placeholder="Senha" />
        <Button>CRIAR CONTA GRÁTIS</Button>
      </form>
      <a href="">
        <MdKeyboardBackspace size={25} />
        Voltar para página de login
      </a>
    </Container>
  );
};

export default SignUp;
