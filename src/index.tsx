import type React from 'react';
import { Box, Text, Button, VStack, Center } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { Telas } from './interfaces/Telas';
import { Perguntas } from './interfaces/Perguntas';

const Home: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<Telas>>();

  return (
    <Center flex={1} bg="blue.50" p={6}>
      <Box w="90%" maxW="400px" p={8} bg="white" borderRadius="lg" shadow={4} alignItems="center">
        <VStack space={6} alignItems="center">
          <Text fontSize="2xl" fontWeight="bold" color="blue.900" textAlign="center">
            Bem-vindo ao App de Escolhas de Tecnologia para Tratamento de Esgoto
          </Text>
          <Text fontSize="md" color="gray.600" textAlign="center" lineHeight="lg">
            Este aplicativo ajuda a selecionar as melhores tecnologias para o tratamento de esgoto,
            com base em diferentes critérios e situações específicas.
          </Text>
          <Button 
            onPress={() => navigation.navigate('Questionario', { perguntaId: "TemDisponibilidadeHídrica" })} 
            colorScheme="blue" 
            size="lg" 
            mt={4} 
            w="75%"
            _text={{ fontSize: "md", fontWeight: "bold" }}
          >
            Vamos começar
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Home;
