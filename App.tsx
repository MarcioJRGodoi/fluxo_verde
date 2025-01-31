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
import Visao3D from './src/telas/Visao3D';
import FeedbackScreen from './src/telas/Feedback';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
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
          title: 'Implementação',
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Visao3D"
        component={Visao3D}
        options={{
          title: '3D Viewer',
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
};

const customTheme = extendTheme({
  colors: {
    primary: {
      50: '#E7F6EF',
      100: '#C3E6D8',
      200: '#9FD6C2',
      300: '#7BC6AB',
      400: '#58B695',
      500: '#34A67E',
      600: '#1E7C58',
      700: '#166044',
      800: '#0F4330',
      900: '#07271C',
    },
    secondary: {
      500: '#F9A825',
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
              backgroundColor: '#E7F6EF',
              paddingTop: 16,
            },
            headerStyle: {
              backgroundColor: '#34A67E',
            },
            headerTintColor: '#fff',
            drawerActiveTintColor: '#1E7C58',
            drawerInactiveTintColor: '#0F4330',
          }}
        >
          <Drawer.Screen name="HomeDrawer" component={MainStack} options={{ title: 'Início' }} />
          <Drawer.Screen name="Duvidas" component={Duvidas} options={{ title: 'Sobre' }} />
          <Drawer.Screen name="Feedback" component={FeedbackScreen} options={{ title: 'Feedback' }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
