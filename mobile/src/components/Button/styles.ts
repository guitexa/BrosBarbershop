import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 45px;
  border-radius: 5px;
  background-color: #eee;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  border: none;
`;

export const TextButton = styled.Text`
  text-transform: uppercase;
  color: #222;
  font-size: 25px;
  font-family: 'Teko-Medium';
`;
