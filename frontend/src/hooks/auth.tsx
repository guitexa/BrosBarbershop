import React, { createContext, useContext, useCallback, useState } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  // Disponibilizar dados do login com o restante da aplicação
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@BrosBarber: token');
    const user = localStorage.getItem('@BrosBarber: user');

    if (token && user) {
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

    setData({ token, user });
  }, []);

  // Fazer signOut
  const signOut = useCallback(() => {
    localStorage.removeItem('@BrosBarber: token');
    localStorage.removeItem('@BrosBarber: user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
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
