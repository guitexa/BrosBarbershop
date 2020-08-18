import styled from 'styled-components/native';
import { RectButton, FlatList } from 'react-native-gesture-handler';

import { Provider } from './index';

export const ContainerImgBg = styled.ImageBackground`
  flex: 1;
  resize-mode: cover;
`;

export const Header = styled.View`
  background: #00000090;
  padding: 20px 20px;
`;

export const ContentHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderText = styled.View``;

export const Welcome = styled.Text`
  font-family: 'Teko-Regular';
  font-size: 24px;
  height: 24px;
  color: #aaa;
`;

export const UserName = styled.Text`
  font-family: 'Teko-Regular';
  font-size: 27px;
  color: #eee;
`;

export const UserAvatar = styled.TouchableOpacity``;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 10px 20px;
`;

export const Title = styled.Text`
  font-family: 'Teko-Regular';
  font-size: 28px;
  color: #eee;
`;

export const ProviderContainer = styled.TouchableOpacity`
  margin: 10px 0;
  flex-direction: row;
  align-items: center;
  padding: 15px 20px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.7);
  border-width: 1px;
  border-color: #eeeeee50;
`;

export const ProviderAvatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-right: 20px;
`;

export const InfoProvider = styled.View``;

export const ProviderName = styled.Text`
  font-family: 'Teko-Regular';
  font-size: 30px;
  height: 34px;
  color: #eee;
`;

export const MetaInfo = styled.View``;

export const Availability = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const AvailabilityText = styled.Text`
  font-family: 'Teko-Light';
  font-size: 20px;
  color: #888;
  margin-left: 10px;
  margin-top: 3px;
`;

export const Hour = styled.View`
  flex-direction: row;
  height: 17px;
  align-items: center;
`;

export const HourText = styled.Text`
  font-family: 'Teko-Light';
  font-size: 20px;
  color: #888;
  margin-left: 10px;
  margin-top: 3px;
`;

export const Footer = styled.View`
  padding: 15px;
`;
