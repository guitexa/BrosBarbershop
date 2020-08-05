import React, { useState, useCallback, useMemo, useEffect } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import {
  isToday,
  isTomorrow,
  format,
  parseISO,
  isAfter,
  isYesterday,
  isBefore,
} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Logo from '../../assets/logo.png';

import { useAuth } from '../../hooks/auth';
import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  Content,
  HeaderContent,
  Profile,
  Schedule,
  Section,
  NextAppointment,
  Appointment,
  Calendar,
} from './styles';
import api from '../../services/api';

interface MonthAvailability {
  day: number;
  available: boolean;
}

interface AppointmentData {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  // Estado para armazenar o dia selecionado
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Estado para armazenar o mês atual
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Estado para armazenar os dias do mês disponíveis recebidos da API
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailability[]
  >([]);

  // Estado para armazenar os agendamentos recebidos da API
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);

  // Função que recebe dia clicado e verifica se está disponível e se não está desabilitado, e altera o estado
  const handleDateChange = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.available) {
        setSelectedDate(day);
      }
    },
    [selectedDate]
  );

  // Função que recebe o mês clicado e altera o estado
  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  // Chamada à API pra trazer os dias do mês disponíveis
  useEffect(() => {
    api
      .get<MonthAvailability[]>(`/providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  // Chamada à API pra trazer os agendamentos
  useEffect(() => {
    api
      .get<AppointmentData[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        const responseFormatted = response.data
          .map((appointment) => {
            return {
              ...appointment,
              hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
            };
          })
          .sort((a, b) => {
            if (a.date < b.date) return -1;
            if (a.date > b.date) return 1;
            return 0;
          });

        setAppointments(responseFormatted);
      });
  }, [selectedDate]);

  // Retorna um array com os dias desabilitados
  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((day) => day.available === false)
      .map((day) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, day.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  // Retorna formatação de data em formato texto
  const selectedDay = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
      locale: ptBR,
    });
  }, [selectedDate]);

  // Retorna formatação do dia da semana
  const selectedDayOfWeek = useMemo(() => {
    const date = format(selectedDate, 'cccc', {
      locale: ptBR,
    });

    return `${date}-feira`;
  }, [selectedDate]);

  // Retorna o próximo agendamento
  const nextAppointment = useMemo(() => {
    return appointments.find((appointment) =>
      isAfter(parseISO(appointment.date), new Date())
    );
  }, [appointments]);

  // Retorna os agendamentos apenas antes do meio dia
  const morningAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) => parseISO(appointment.date).getHours() < 12
    );
  }, [appointments]);

  // Retorna os agendamentos apenas após o meio dia
  const afternoonAppointments = useMemo(() => {
    return appointments.filter(
      (appointment) => parseISO(appointment.date).getHours() > 12
    );
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={Logo} alt="BrosBarbershop" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem vindo,</span>
              <span>{user.name}</span>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower size={22} />
          </button>
          <Calendar>
            <DayPicker
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
              onMonthChange={handleMonthChange}
              modifiers={{
                available: { daysOfWeek: [1, 2, 3, 4, 5] },
              }}
              selectedDays={selectedDate}
              onDayClick={handleDateChange}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ]}
            />
          </Calendar>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários Agendados</h1>
          <div>
            {isYesterday(selectedDate) && <span>Ontem</span>}
            {isToday(selectedDate) && <span>Hoje</span>}
            {isTomorrow(selectedDate) && <span>Amanhã</span>}
            <span>{selectedDay}</span>
            <span>{selectedDayOfWeek}</span>
          </div>
          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <h1>Próximo atendimento</h1>
              <div>
                <img
                  src={nextAppointment.user.avatar_url}
                  alt={nextAppointment.user.name}
                />
                <strong>{nextAppointment.user.name}</strong>
                <div>
                  <FiClock size={28} />
                  <span>{nextAppointment.hourFormatted}</span>
                </div>
              </div>
            </NextAppointment>
          )}
          <Section>
            <span>Manhã</span>
            {morningAppointments.length === 0 && (
              <span>Nenhum agendamento para este período</span>
            )}
            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <div>
                  <FiClock size={22} />
                  <span>{appointment.hourFormatted}</span>
                </div>
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
          <Section>
            <span>Tarde</span>
            {afternoonAppointments.length === 0 && (
              <span>Nenhum agendamento para este período</span>
            )}
            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <div>
                  <FiClock size={22} />
                  <span>{appointment.hourFormatted}</span>
                </div>
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
      </Content>
    </Container>
  );
};

export default Dashboard;
