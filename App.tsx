import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base';
import Home from './src';
import QuestionScreen from './src/telas/Questionario';
import Resultado from './src/telas/Resultado';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack Navigator para a navegação geral (Home e Questionário)
const MainStack =() => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: false }} // Oculta o cabeçalho na tela inicial
      />
      <Stack.Screen 
        name="Questionario" 
        component={QuestionScreen} 
        options={{
          title: 'Questionário',
          headerBackTitleVisible: false, // Oculta o texto "Voltar"
        }}
      />
      <Stack.Screen 
        name="Resultado" 
        component={Resultado} 
        options={{
          title: 'Resultado',
          headerBackTitleVisible: false, // Oculta o texto "Voltar"
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

const  App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={MainStack} options={{ title: 'Início' }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;