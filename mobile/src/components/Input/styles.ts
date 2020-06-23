import styled, { css } from 'styled-components/native';

import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 45px;
  border-radius: 5px;
  background-color: transparent;
  border-width: 1px;
  border-color: #eeeeee80;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 10px;

  ${({ isErrored }) =>
    isErrored &&
    css`
      border-color: #880000;
    `};

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: #eeeeee;
    `};
`;

export const Icon = styled(FeatherIcon)`
  margin: 0 10px 0 10px;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #eee;
  font-size: 15px;
  font-family: 'Teko-Medium';
`;
