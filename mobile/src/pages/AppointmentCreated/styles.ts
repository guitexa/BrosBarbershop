import styled from 'styled-components/native';

export const ContainerImgBg = styled.ImageBackground`
  flex: 1;
  align-items: center;
  padding: 0 40px;
  resize-mode: cover;
  justify-content: center;
`;

export const AppointmentConfirmation = styled.Text`
  font-family: 'Teko-Medium';
  font-size: 35px;
  line-height: 30px;
  padding-top: 10px;
  text-align: center;
  margin: 20px 0;
  color: #eee;
`;

export const AppointmentTime = styled.Text`
  font-family: 'Teko-Light';
  font-size: 29px;
  color: #aaa;
  line-height: 28px;
  padding-top: 10px;
  text-align: center;
  margin-bottom: 20px;
`;

export const OkButton = styled.TouchableOpacity`
  padding: 10px 50px;
  background: #eee;
  border-radius: 8px;
`;

export const OkButtonText = styled.Text`
  font-family: 'Teko-Medium';
  font-size: 28px;
  height: 34px;
  color: #000;
`;
