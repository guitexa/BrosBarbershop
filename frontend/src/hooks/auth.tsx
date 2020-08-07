import React, { createContext, useContext, useCallback, useState } from 'react';
import api from '../services/api';

interface User {
  id: string;
  avatar_url: string;
  email: string;
  name: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateProfile(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  // Disponibilizar dados do login com o restante da aplicação
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@BrosBarber: token');
    const user = localStorage.getItem('@BrosBarber: user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer: ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  // Buscar dados de login na API
  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    // Armazenar token e user no localStorage
    localStorage.setItem('@BrosBarber: token', token);
    localStorage.setItem('@BrosBarber: user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer: ${token}`;

    setData({ token, user });
  }, []);

  // Fazer signOut
  const signOut = useCallback(() => {
    localStorage.removeItem('@BrosBarber: token');
    localStorage.removeItem('@BrosBarber: user');

    setData({} as AuthState);
  }, []);

  const updateProfile = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
      });

      localStorage.setItem('@BrosBarber: user', JSON.stringify(user));
    },
    [data.token]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be within AuthProvider');
  }

  return context;
}
