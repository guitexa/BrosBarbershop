import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Platform, Alert, BackHandler } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  format,
  isWeekend,
  isBefore,
  isSaturday,
  isSunday,
  isToday,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

import bgdark from '../../assets/bgdark.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  ContainerImgBg,
  Header,
  ContentHeader,
  BackButton,
  Title,
  UserAvatar,
  Avatar,
  ProvidersContainer,
  ProvidersList,
  ProviderButton,
  ProviderAvatar,
  ProviderName,
  Footer,
  DatePickerButton,
  DatePickerButtonText,
  PeriodTitle,
  Unavailable,
  AvailableHours,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';

interface RouteParams {
  provider_id: string;
}

export interface Provider {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AvailabilityHour {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { params } = useRoute();
  const { provider_id } = params as RouteParams;

  //Estado para armazenar os prestadores recebidos da API
  const [providers, setProviders] = useState<Provider[]>([]);
  //Estado para armazenar o prestadores selecionado
  const [selectedProvider, setSelectedProvider] = useState(provider_id);
  //Estado para armazenar se o calendário está aberto ou fechado
  const [showDatePicker, setShowDatePicker] = useState(false);
  //Estado para armazenar a data selecionada
  const [selectedDate, setSelectedDate] = useState(new Date());
  //Estado para armazenar a hora selecionada
  const [selectedHour, setSelectedHour] = useState(0);
  //Estado para armazenar a disponibilidade do prestador recebido da API
  const [availability, setAvailability] = useState<AvailabilityHour[]>([]);

  const { reset, goBack, navigate } = useNavigation();

  const { user } = useAuth();

  //Chamada à API para buscar os prestadores
  useEffect(() => {
    api
      .get<Provider[]>('/providers')
      .then((response) => setProviders(response.data));
  }, []);

  //Chamada à API para buscar a disponibilidade do prestador selecionado
  useEffect(() => {
    api
      .get<AvailabilityHour[]>(
        `/providers/${selectedProvider}/day-availability`,
        {
          params: {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth() + 1,
            day: selectedDate.getDate(),
          },
        }
      )
      .then((response) => setAvailability(response.data));
  }, [selectedProvider, selectedDate]);

  //Função para alterar o comportamento do botão de voltar do Android
  useEffect(
    useCallback(() => {
      const onBackPress = () => {
        goBack();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [goBack])
  );

  //Função para navegar para o profile ao clicar na foto
  const handleNavigateToProfile = useCallback(() => {
    navigate('Profile');
  }, []);

  //Função para alterar o prestador selecionado
  const handleChangeProvider = useCallback((providerID: string) => {
    setSelectedProvider(providerID);
  }, []);

  //Função para abrir e fechar o calendário
  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker((state) => !state);
  }, []);

  //Função para selecionar uma data no calendário
  const handleDateChange = useCallback((event: any, date: Date | undefined) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      if (isWeekend(date)) {
        return Alert.alert(
          'Ops!',
          'Este prestador atende de segunda à sexta-feira'
        );
      }
      if (isBefore(date.getDate(), new Date().getDate())) {
        return Alert.alert('Ops!', 'Não é possível escolher uma data passada');
      }

      setSelectedDate(date);
      setSelectedHour(0);
    }
  }, []);

  //Função para criar o agendamento, enviar para API e redirecionar o usuário para tela de sucesso
  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('/appointments', {
        provider_id,
        date,
      });

      reset({
        index: 0,
        routes: [
          {
            name: 'AppointmentCreated',
            params: { date: date.getTime() },
          },
        ],
      });
    } catch (err) {
      Alert.alert(
        'Erro ao criar o agendamento',
        'Verifique as informações e tente novamente.'
      );
    }
  }, [selectedDate, selectedHour]);

  //Função para selecionar uma hora disponível
  const handleHourChange = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  //Retorna a disponibilidade no período da manhã
  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ available, hour }) => hour < 12 && available === true)
      .map(({ hour }) => {
        return {
          hour,
          formattedHour: format(new Date().setHours(hour), "HH':00'"),
        };
      });
  }, [availability]);

  //Retorna a disponibilidade no período da tarde
  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ available, hour }) => hour >= 12 && available === true)
      .map(({ hour }) => {
        return {
          hour,
          formattedHour: format(new Date().setHours(hour), "HH':00'"),
        };
      });
  }, [availability]);

  //Retorna a data selecionada formatada
  const selectedDay = useMemo(() => {
    const today = new Date();

    if (isSaturday(selectedDate) && isToday(selectedDate)) {
      setSelectedDate(new Date(today.setDate(today.getDate() + 2)));
    }

    if (isSunday(selectedDate) && isToday(selectedDate)) {
      setSelectedDate(new Date(today.setDate(today.getDate() + 1)));
    }

    const formattedDate = format(selectedDate, "dd 'de' MMMM - cccc'-feira'", {
      locale: ptBR,
    });

    return formattedDate;
  }, [selectedDate]);

  return (
    <ContainerImgBg source={bgdark}>
      <Header>
        <ContentHeader>
          <BackButton onPress={() => goBack()}>
            <Icon name="chevron-left" size={30} color="#eee" />
            <Title>Cabeleireiros</Title>
          </BackButton>
          <UserAvatar onPress={handleNavigateToProfile}>
            <Avatar source={{ uri: user.avatar_url }} />
          </UserAvatar>
        </ContentHeader>
      </Header>
      <ScrollView>
        <ProvidersList
          data={providers}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={<Footer />}
          keyExtractor={(provider) => provider.id}
          renderItem={({ item: provider }) => (
            <ProvidersContainer>
              <ProviderButton
                onPress={() => handleChangeProvider(provider.id)}
                select={selectedProvider === provider.id}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                <ProviderName select={selectedProvider === provider.id}>
                  {provider.name}
                </ProviderName>
              </ProviderButton>
            </ProvidersContainer>
          )}
        />
        <Title>Dia escolhido</Title>
        <DatePickerButton onPress={handleToggleDatePicker}>
          <DatePickerButtonText>{selectedDay}</DatePickerButtonText>
        </DatePickerButton>
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            onChange={handleDateChange}
            mode="date"
            textColor="#f4ede8"
          />
        )}
        <Title>Escolha o horário</Title>
        <PeriodTitle>Manhã</PeriodTitle>
        {morningAvailability.length === 0 && (
          <Unavailable>Nenhum horário disponível para este período</Unavailable>
        )}
        <AvailableHours>
          {morningAvailability.map(({ formattedHour, hour }) => (
            <Hour
              key={formattedHour}
              onPress={() => handleHourChange(hour)}
              select={selectedHour === hour}
            >
              <HourText select={selectedHour === hour}>
                {formattedHour}
              </HourText>
            </Hour>
          ))}
        </AvailableHours>
        <PeriodTitle>Tarde</PeriodTitle>
        {afternoonAvailability.length === 0 && (
          <Unavailable>Nenhum horário disponível para este período</Unavailable>
        )}
        <AvailableHours>
          {afternoonAvailability.map(({ formattedHour, hour }) => (
            <Hour
              key={formattedHour}
              onPress={() => handleHourChange(hour)}
              select={selectedHour === hour}
            >
              <HourText select={selectedHour === hour}>
                {formattedHour}
              </HourText>
            </Hour>
          ))}
        </AvailableHours>
        <CreateAppointmentButton
          onPress={handleCreateAppointment}
          disabled={selectedHour === 0}
        >
          <CreateAppointmentButtonText disabled={selectedHour === 0}>
            Agendar
          </CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </ScrollView>
    </ContainerImgBg>
  );
};

export default CreateAppointment;
