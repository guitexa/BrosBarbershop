import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthRoutes from './routes';

import { View } from 'react-native';

const App: React.FC = () => (
  <NavigationContainer>
    <View style={{ backgroundColor: '#222' }} />
    <AuthRoutes />
  </NavigationContainer>
);

export default App;
