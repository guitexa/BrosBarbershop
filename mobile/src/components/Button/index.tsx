import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

interface ButtonProps extends RectButtonProperties {
  children: string;
  title?: string;
}

import { Container, TextButton } from './styles';

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container {...rest}>
    <TextButton>{children}</TextButton>
  </Container>
);

export default Button;
