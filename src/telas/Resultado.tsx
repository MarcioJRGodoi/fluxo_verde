import type React from 'react';
import { useState, useEffect } from 'react';
import { Box, Text, VStack, Button, Center, Divider } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { resultados } from '../perguntasHEHE/perguntas';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { Telas } from '../interfaces/Telas';
import type { Route } from '../interfaces/Perguntas';

const ResultScreen: React.FC<{ route: Route }> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<Telas>>();
  const { resultadoId } = route.params;
  const [result, setResult] = useState<string[]>([]);
  console.log("resultadoId ", resultadoId);
  useEffect(() => {
    const resultTechnologies = resultados[resultadoId].resultado;
    setResult([...resultTechnologies]);
  }, [resultadoId]);

  return (
    <Center flex={1} bg="gray.100" p={6}>
      <Box w="90%" maxW="400px" p={8} bg="white" borderRadius="lg" shadow={4}>
        <VStack space={4} alignItems="center">
          <Text fontSize="2xl" fontWeight="bold" color="blue.800" textAlign="center">
            Tecnologias Recomendadas
          </Text>
          <Divider my={4} bg="blue.200" />
          <VStack space={3} alignItems="center" w="100%">
            {result.map((tech, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Text key={index} fontSize="md" color="blue.700" textAlign="center">
                {tech}
              </Text>
            ))}
          </VStack>
          <Button onPress={() => navigation.navigate('Home')} colorScheme="blue" mt={6} w="75%">
            Voltar para Início
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default ResultScreen;
