import styled from 'styled-components/native';

export const ContainerImgBg = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
  resize-mode: cover;
`;

export const ContainerScroll = styled.ScrollView`
  width: 100%;
  padding: 0 40px;
`;

export const Header = styled.View`
  width: 100%;
  margin-top: 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const BackButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: -5px;
  padding: 0 15px 15px 0;
`;

export const Title = styled.Text`
  font-family: 'Teko-Regular';
  font-size: 30px;
  color: #eee;
  height: 33px;
  margin-left: 20px;
`;

export const UserAvatar = styled.View`
  margin-bottom: 25px;
`;

export const Avatar = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
`;

export const CameraButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 0;
  padding-bottom: 2px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: #eee;
  border-width: 2px;
  border-color: #000;
  z-index: 9999;
`;

export const SignOutButton = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  border-top-width: 1px;
  border-color: #aaaaaa50;
  margin-top: 40px;
  margin-bottom: 40px;
  padding-top: 10px;
  justify-content: center;
  align-items: center;
`;

export const SignOutButtonText = styled.Text`
  margin-right: 10px;
  font-family: 'Teko-Light';
  font-size: 22px;
  margin-top: 3px;
  text-transform: uppercase;
  color: #eeeeee90;
`;
