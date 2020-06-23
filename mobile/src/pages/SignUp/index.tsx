import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.png';
import bgdark from '../../assets/bgdark.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  ContainerImgBg,
  DivImg,
  BackToSignIn,
  BackToSignInText,
  FullButton,
} from './styles';

interface DataForm {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [open, setOpen] = useState(false);

  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: DataForm) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'Senha deve ter no mínimo 6 dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        Alert.alert(
          'Usuário cadastrado com sucesso',
          'Agora você pode fazer login na aplicação'
        );

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert('Erro no cadastro', 'Verifique os dados e tente novamente');
      }
    },
    [navigation]
  );

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  const keyboardDidShow = useCallback(() => {
    setOpen(true);
  }, []);

  const keyboardDidHide = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <ContainerImgBg source={bgdark}>
            {!open && (
              <DivImg>
                <Image source={logoImg} />
              </DivImg>
            )}
            <Form
              style={{ width: '100%' }}
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <Input
                name="name"
                icon="user"
                placeholder="NOME"
                onSubmitEditing={Keyboard.dismiss}
              />
              <Input
                name="email"
                icon="mail"
                placeholder="E-MAIL"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onSubmitEditing={Keyboard.dismiss}
              />
              <Input
                name="password"
                icon="lock"
                placeholder="SENHA"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  Keyboard.dismiss;
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Criar conta grátis
              </Button>
            </Form>
          </ContainerImgBg>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn>
        <FullButton
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-left" size={20} color="#eee" />
          <BackToSignInText>Voltar para página de login</BackToSignInText>
        </FullButton>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
