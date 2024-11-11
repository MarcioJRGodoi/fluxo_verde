import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Box, Text, Button, VStack, Center, Spinner } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { type Pergunta, perguntas } from '../perguntasHEHE/perguntas';
import type { Telas } from '../interfaces/Telas';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { Perguntas, Route } from '../interfaces/Perguntas';


const Questionario: React.FC<{ route: Route }> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<Telas>>();
  const [currentQuestion, setCurrentQuestion] = useState<Pergunta>();
  const { perguntaId } = route.params as unknown as { perguntaId: keyof typeof perguntas };
  const fadeAnim = useRef(new Animated.Value(0)).current;
  console.log("perguntaId ", currentQuestion);
  useEffect(() => {
    const question = perguntas[perguntaId];
    setCurrentQuestion(question);
  }, [perguntaId]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    // Iniciar a animação de fade-in ao carregar uma nova pergunta
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentQuestion]);

  // answer sera o valor de sim ou nao
  const handleAnswer = (answer: 'sim' | 'nao') => {
    const nextQuestionId = currentQuestion ? currentQuestion[answer] as keyof typeof Perguntas : "TemDisponibilidadeHídrica" as keyof typeof Perguntas;
    // biome-ignore lint/complexity/useOptionalChain: <explanation>
    if (currentQuestion && currentQuestion[answer].startsWith('resultado')) {
      navigation.navigate('Resultado', { resultadoId: nextQuestionId });
    } else {
      // Resetar a animação e navegar para a próxima pergunta
      fadeAnim.setValue(0);
      navigation.navigate('Questionario', { perguntaId: nextQuestionId });
    }
  };

  if (!currentQuestion) {
    return (
      <Center flex={1} bg="gray.100">
        <Spinner color="blue.500" size="lg" />
        <Text mt={4} fontSize="lg" color="gray.500">
          Carregando...
        </Text>
      </Center>
    );
  }

  return (
    <Center flex={1} bg="gray.100" p={6}>
      <Animated.View style={{ opacity: fadeAnim, width: "100%", alignItems: "center" }}>
        <Box w="90%" maxW="400px" p={8} bg="white" borderRadius="lg" shadow={4}>
          <VStack space={6} alignItems="center">
            <Text fontSize="2xl" fontWeight="bold" color="blue.900" textAlign="center">
              {currentQuestion.pergunta}
            </Text>
            <Button
              onPress={() => handleAnswer('sim')}
              colorScheme="blue"
              w="100%"
              h="50px"
              _text={{ fontSize: "lg", fontWeight: "bold" }}
            >
              Sim
            </Button>
            <Button
              onPress={() => handleAnswer('nao')}
              colorScheme="red"
              w="100%"
              h="50px"
              _text={{ fontSize: "lg", fontWeight: "bold" }}
            >
              Não
            </Button>
          </VStack>
        </Box>
      </Animated.View>
    </Center>
  );
};

export default Questionario;
