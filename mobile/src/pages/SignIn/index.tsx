import React from 'react';
import { Image } from 'react-native';

import logoImg from '../../assets/logo.png';
import bgdark from '../../assets/bgdark.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { ContainerImgBg, DivImg } from './styles';

const SignIn: React.FC = () => (
  <>
    <ContainerImgBg source={bgdark}>
      <DivImg>
        <Image source={logoImg} />
      </DivImg>
      <Input
        name="email"
        icon="mail"
        placeholder="E-MAIL"
        autoCapitalize="none"
      />
      <Input
        name="password"
        icon="lock"
        placeholder="SENHA"
        autoCapitalize="none"
      />
      <Button
        onPress={() => {
          console.log('oi');
        }}
      >
        Login
      </Button>
    </ContainerImgBg>
  </>
);

export default SignIn;
