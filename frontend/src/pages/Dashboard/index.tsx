import React from 'react';

import Logo from '../../assets/logo.png';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <img src={Logo} alt="BrosBarbershop" />
      <h1>Seja bem-vindo</h1>
    </Container>
  );
};

export default Dashboard;
