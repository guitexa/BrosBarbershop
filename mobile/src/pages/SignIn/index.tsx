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

import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.png';
import bgdark from '../../assets/bgdark.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  ContainerImgBg,
  DivImg,
  CreateAccount,
  CreateAccountText,
  FullButton,
} from './styles';

interface SignInCredentials {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [open, setOpen] = useState(false);

  const navigation = useNavigation();

  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: SignInCredentials) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro no login',
          'Verifique o e-mail e senha e tente novamente'
        );
      }
    },
    [signIn]
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
                  formRef.current?.submitForm();
                  Keyboard.dismiss;
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Login
              </Button>
            </Form>
          </ContainerImgBg>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccount>
        <FullButton
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        >
          <Icon name="user-plus" size={20} color="#eee" />
          <CreateAccountText>Criar uma conta grátis</CreateAccountText>
        </FullButton>
      </CreateAccount>
    </>
  );
};

export default SignIn;
