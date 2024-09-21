import React from 'react';
import { Box, Text, Button, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Telas } from './tipos/Telas';



const Home: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<Telas>>();

    return (
      <Box flex={1} bg="lightBlue.100" justifyContent="center" alignItems="center" p={4}>
        <VStack space={4} alignItems="center">
          <Text fontSize="3xl" fontWeight="bold" color="blue.800">
            Bem-vindo ao App de Escolhas de Tecnologia para Tratamento de Esgoto
          </Text>
          <Text fontSize="md" textAlign="center" color="blue.600">
            Este aplicativo ajuda a selecionar as melhores tecnologias para o tratamento de esgoto,
            com base em diferentes critérios e situações específicas.
          </Text>
          <Button onPress={() => navigation.navigate('Questionario', { perguntaId: "1" })} colorScheme="blue" mt={6}>
            Vamos começar
          </Button>
        </VStack>
      </Box>
    );
  };

export default Home;
