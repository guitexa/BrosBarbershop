import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo.png';
import bgdark from '../../assets/bgdark.png';

import { ContainerImgBg, DivImg, Text, TextButton } from './styles';

const AppointmentCreated: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <ContainerImgBg source={bgdark}>
      <DivImg>
        <Image source={logoImg} />
      </DivImg>
      <Text>AppointmentCreated</Text>
      <TouchableOpacity onPress={signOut}>
        <TextButton>SAIR</TextButton>
      </TouchableOpacity>
    </ContainerImgBg>
  );
};

export default AppointmentCreated;
