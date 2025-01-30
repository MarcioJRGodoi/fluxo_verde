import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { extendTheme, NativeBaseProvider } from 'native-base';
import Home from './src';
import Questionario from './src/telas/Questionario';
import Resultado from './src/telas/Resultado';
import Duvidas from './src/telas/Duvidas';
import Detalhes from './src/telas/Detalhes';
import Imagens from './src/telas/Imagens';
import Implementacao from './src/telas/Implementacao';
import ThreeDViewer from './src/telas/ThreeDViewer';
import FeedbackScreen from './src/telas/Feedback';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack Navigator para a navegação geral (Home e Questionário)
const MainStack = () => {
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
      <Stack.Screen
        name="Detalhes"
        component={Detalhes}
        options={{
          title: 'Detalhes',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Imagens"
        component={Imagens}
        options={{
          title: 'Imagens',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Implementacao"
        component={Implementacao}
        options={{
          title: 'Implementacao',
          headerShown: false
        }}
      />
      {/* <Stack.Screen
        name="PanoramaViewer"
        component={PanoramaViewer}
        options={{
          title: 'PanoramaViewer',
          headerShown: false
        }}
      /> */}
      <Stack.Screen
        name="ThreeDViewer"
        component={ThreeDViewer}
        options={{
          title: 'ThreeDViewer',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          title: 'Feedback',
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

const customTheme = extendTheme({
  colors: {
    primary: {
      50: '#e0f7fa',
      100: '#b2ebf2',
      200: '#80deea',
      300: '#4dd0e1',
      400: '#26c6da',
      500: '#00bcd4',
      600: '#00acc1',
      700: '#0097a7',
      800: '#00838f',
      900: '#006064',
    },
    secondary: {
      500: '#ff4081', // Para destacar ações importantes
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'full',
        shadow: 2,
        _text: {
          color: 'white',
        },
        _pressed: {
          bg: 'primary.700',
        },
      },
      defaultProps: {
        colorScheme: 'primary',
      },
    },
    Heading: {
      baseStyle: {
        color: 'primary.800',
        fontWeight: 'bold',
        fontSize: 'xl',
      },
    },
    Text: {
      baseStyle: {
        color: 'primary.700',
      },
    },
  },
});

const App = () => {
  return (
    <NativeBaseProvider theme={customTheme}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="HomeDrawer"
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#e0f7fa',
              paddingTop: 16,
            },
            headerStyle: {
              backgroundColor: '#00acc1',
            },
            headerTintColor: '#fff',
            drawerActiveTintColor: '#00bcd4',
            drawerInactiveTintColor: '#006064',
          }}
        >
          <Drawer.Screen name="HomeDrawer" component={MainStack} options={{ title: 'Inicio' }} />
          {/* <Drawer.Screen
            name="Questionario"
            component={Questionario}
            options={{ title: 'Questionario' }}
            initialParams={{ perguntaId: "TemDisponibilidadeHídrica" }}
          /> */}
          <Drawer.Screen name="Duvidas" component={Duvidas} options={{ title: 'Sobre' }} />

          <Drawer.Screen name="Feedback" component={FeedbackScreen} options={{ title: 'Feedback' }} />

        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;