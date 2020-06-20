import React from 'react';
import { TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

import { Container, Icon, TextInput } from './styles';

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => (
  <Container>
    <Icon name={icon} size={20} color="#888" />
    <TextInput
      keyboardAppearance="dark"
      placeholderTextColor="#888"
      {...rest}
    />
  </Container>
);

export default Input;
