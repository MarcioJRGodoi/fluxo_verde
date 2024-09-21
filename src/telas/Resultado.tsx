import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { resultados } from '../perguntasHEHE/perguntas';
import { StackNavigationProp } from '@react-navigation/stack';
import { Telas } from '../tipos/Telas';

const ResultScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<Telas>>();
  const { resultId } = route.params;
  const [result, setResult] = useState<string[]>([]);

  useEffect(() => {
    const resultTechnologies = resultados[resultId].resultado;
    setResult([...resultTechnologies]); // Uso de spread operator para garantir imutabilidade
  }, [resultId]);

  return (
    <Box flex={1} justifyContent="center" alignItems="center" p={4} bg="white">
      <VStack space={6} alignItems="center">
        <Text fontSize="xl" fontWeight="bold" color="blue.800">
          Tecnologias Recomendadas
        </Text>
        {result.map((tech, index) => (
          <Text key={index} fontSize="md" color="blue.600">
            {tech}
          </Text>
        ))}
        <Button onPress={() => navigation.navigate('Home')} colorScheme="blue" mt={6}>
          Voltar para Início
        </Button>
      </VStack>
    </Box>
  );
};

export default ResultScreen;
