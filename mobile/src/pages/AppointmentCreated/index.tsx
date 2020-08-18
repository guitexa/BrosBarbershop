import React, { useMemo, useEffect, useCallback } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Icon from 'react-native-vector-icons/Feather';

import bgdark from '../../assets/bgdark.png';

import {
  ContainerImgBg,
  AppointmentConfirmation,
  AppointmentTime,
  OkButton,
  OkButtonText,
} from './styles';
import { BackHandler } from 'react-native';

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const { params } = useRoute();
  const { date } = params as RouteParams;

  const { navigate } = useNavigation();

  //Função para alterar o comportamento do botão de voltar do Android
  useEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigate('Dashboard');
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigate])
  );

  const formattedDate = useMemo(() => {
    const newDate = format(
      date,
      "cccc'-feira, dia' dd 'de' MMMM 'de' yyyy 'às' HH:'00'",
      {
        locale: ptBR,
      }
    );

    const uppercaseFirstLetter = newDate.charAt(0).toUpperCase();
    const stringWithoutFirstLetter = newDate.slice(1);

    return `${uppercaseFirstLetter}${stringWithoutFirstLetter}`;
  }, [date]);

  return (
    <ContainerImgBg source={bgdark}>
      <Icon name="check" size={120} color="#1c8f07" />
      <AppointmentConfirmation>
        Agendamento realizado com sucesso
      </AppointmentConfirmation>
      <AppointmentTime>{formattedDate}</AppointmentTime>
      <OkButton onPress={() => navigate('Dashboard')}>
        <OkButtonText>OK</OkButtonText>
      </OkButton>
    </ContainerImgBg>
  );
};

export default AppointmentCreated;
