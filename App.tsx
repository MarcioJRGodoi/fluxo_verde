import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base';
import Home from './src';
import Questionario from './src/telas/Questionario';
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
        component={Questionario}
        options={{
          title: 'Questionário',
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="Resultado" 
        component={Resultado} 
        options={{
          title: 'Resultado',
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
        <Drawer.Navigator initialRouteName="HomeDrawer">
          <Drawer.Screen name="HomeDrawer" component={MainStack} options={{ title: 'Início' }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;