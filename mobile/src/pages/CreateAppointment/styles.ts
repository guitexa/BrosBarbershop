import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native-gesture-handler';
import { Provider } from './index';

interface ProviderButtonProps {
  select: boolean;
}

interface HourButtonProps {
  select: boolean;
}

interface AppointBtProps {
  disabled: boolean;
}

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

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'Teko-Regular';
  font-size: 30px;
  color: #eee;
  height: 33px;
  margin-left: 20px;
`;

export const UserAvatar = styled.TouchableOpacity``;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
`;

export const ProvidersContainer = styled.View`
  height: 55px;
  margin-right: 15px;
  justify-content: center;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 10px 20px;
`;

export const ProviderButton = styled.TouchableOpacity<ProviderButtonProps>`
  padding: 3px 12px;
  background: ${({ select }) => (select ? '#eee' : '#000')};
  border-width: 1px;
  border-color: #eeeeee30;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;

export const ProviderName = styled.Text<ProviderButtonProps>`
  font-family: 'Teko-Regular';
  font-size: 28px;
  color: ${({ select }) => (select ? '#000' : '#eee')};
  margin-left: 10px;
  margin-top: 5px;
`;

export const Footer = styled.View`
  padding: 5px;
`;

export const DatePickerButton = styled.TouchableOpacity`
  padding: 8px;
  background: #eee;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 10px 20px 20px 20px;
`;

export const DatePickerButtonText = styled.Text`
  font-family: 'Teko-Regular';
  font-size: 30px;
  color: #000;
  height: 33px;
`;

export const PeriodTitle = styled.Text`
  font-family: 'Teko-Regular';
  font-size: 20px;
  color: #aaa;
  height: 23px;
  margin: 10px 0 0 20px;
`;

export const Unavailable = styled.Text`
  font-family: 'Teko-Light';
  font-size: 23px;
  color: #eee;
  height: 23px;
  margin: 11px 0 10px 0;
  text-align: center;
`;

export const AvailableHours = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 15 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin: 5px 0;
  padding-left: 5px;
`;

export const Hour = styled.TouchableOpacity<HourButtonProps>`
  ${({ select }) =>
    select &&
    css`
      padding: 8px 12px;
      background: #eee;
      border-width: 1px;
      border-color: #eeeeee30;
      margin-right: 10px;
      border-radius: 8px;
    `}
  ${({ select }) =>
    !select &&
    css`
      padding: 8px 12px;
      background: #000;
      border-width: 1px;
      border-color: #eeeeee30;
      margin-right: 10px;
      border-radius: 8px;
    `}
`;

export const HourText = styled.Text<HourButtonProps>`
  font-family: 'Teko-Regular';
  font-size: 24px;
  color: ${({ select }) => (select ? '#000' : '#eee')};
  height: 26px;
`;

export const CreateAppointmentButton = styled.TouchableOpacity<AppointBtProps>`
  padding: 8px;
  border-width: 1px;
  border-color: #eeeeee30;
  background: ${({ disabled }) => (disabled ? 'transparent' : '#eee')};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 10px 20px 20px 20px;
`;

export const CreateAppointmentButtonText = styled.Text<AppointBtProps>`
  font-family: 'Teko-Regular';
  font-size: 30px;
  color: ${({ disabled }) => (disabled ? '#eeeeee30' : '#000')};
  height: 33px;
`;
