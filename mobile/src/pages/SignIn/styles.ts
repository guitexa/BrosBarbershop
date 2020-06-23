import styled from 'styled-components/native';

import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Text = styled.Text`
  color: #eee;
  font-family: 'Teko-Medium';
  font-size: 20px;
  margin-top: 40px;
`;

export const DivImg = styled.View`
  margin-bottom: 25px;
`;

export const ContainerImgBg = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 40px 40px;
  resize-mode: cover;
  justify-content: center;
`;

export const CreateAccount = styled.View`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 10px 0 ${10 + getBottomSpace()}px;
  width: 100%;
  height: 50px;
  border-top-width: 1px;
  border-color: #eee;
  background-color: #060505;
`;

export const FullButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountText = styled.Text`
  margin-left: 10px;
  font-family: 'Teko-Light';
  font-size: 20px;
  text-transform: uppercase;
  color: #eee;
`;
