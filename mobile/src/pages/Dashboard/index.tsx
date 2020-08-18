import React, { useEffect, useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Alert, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import bgdark from '../../assets/bgdark.png';

import {
  ContainerImgBg,
  Header,
  ContentHeader,
  HeaderText,
  Welcome,
  UserName,
  UserAvatar,
  Avatar,
  ProvidersList,
  Title,
  ProviderContainer,
  ProviderAvatar,
  InfoProvider,
  ProviderName,
  MetaInfo,
  Availability,
  AvailabilityText,
  Hour,
  HourText,
  Footer,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  //Estado para armazenar os providers recebidos da API
  const [providers, setProviders] = useState<Provider[]>([]);

  const { user } = useAuth();

  const { navigate } = useNavigation();

  //Chamada à API para trazer os providers
  useEffect(() => {
    api
      .get<Provider[]>('/providers')
      .then((response) => setProviders(response.data));
  }, []);

  //Função para controlar o botão de voltar do Android
  useEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          'Ops!',
          'Deseja sair da aplicação?',
          [
            {
              text: 'Não',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Sim',
              onPress: () => BackHandler.exitApp(),
            },
          ],
          { cancelable: true }
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  //Função para navegar para o profile ao clicar na foto
  const handleNavigateToProfile = useCallback(() => {
    navigate('Profile');
  }, []);

  //Função que recebe o provider_id e navega para página de criação do agendamento
  const handleCreateAppointment = useCallback((provider_id: string) => {
    navigate('CreateAppointment', { provider_id });
  }, []);

  return (
    <ContainerImgBg source={bgdark}>
      <Header>
        <ContentHeader>
          <HeaderText>
            <Welcome>Bem vindo,</Welcome>
            <UserName>{user.name}</UserName>
          </HeaderText>
          <UserAvatar onPress={handleNavigateToProfile}>
            <Avatar source={{ uri: user.avatar_url }} />
          </UserAvatar>
        </ContentHeader>
      </Header>
      <ProvidersList
        data={providers}
        keyExtractor={(provider) => provider.id}
        ListHeaderComponent={<Title>Cabeleireiros</Title>}
        ListFooterComponent={<Footer />}
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => {
              handleCreateAppointment(provider.id);
            }}
          >
            <ProviderAvatar source={{ uri: provider.avatar_url }} />
            <InfoProvider>
              <ProviderName>{provider.name}</ProviderName>
              <MetaInfo>
                <Availability>
                  <Icon name="calendar" size={15} color="#aaa" />
                  <AvailabilityText>Segunda à sexta-feira</AvailabilityText>
                </Availability>
                <Hour>
                  <Icon name="clock" size={15} color="#aaa" />
                  <HourText>8h às 17h</HourText>
                </Hour>
              </MetaInfo>
            </InfoProvider>
          </ProviderContainer>
        )}
      />
    </ContainerImgBg>
  );
};

export default Dashboard;
