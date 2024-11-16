import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { Box, Text, Button, VStack, Center, Spinner } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { type Pergunta, perguntas } from '../perguntasHEHE/perguntas';
import type { Telas } from '../interfaces/Telas';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { Perguntas, Route_PerguntasRespostas } from '../interfaces/Perguntas';

const Questionario: React.FC<{ route: Route_PerguntasRespostas }> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<Telas>>();
  const [currentQuestion, setCurrentQuestion] = useState<Pergunta>();
  const { perguntaId } = route.params as unknown as { perguntaId: keyof typeof perguntas };
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current; // Posição inicial para o efeito de deslizar

  useEffect(() => {
    const question = perguntas[perguntaId];
    setCurrentQuestion(question);
  }, [perguntaId]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ]).start();
  }, [currentQuestion]);

  const handleAnswer = (answer: 'sim' | 'nao') => {
    const nextQuestionId = currentQuestion ? currentQuestion[answer] as keyof typeof Perguntas : "TemDisponibilidadeHídrica" as keyof typeof Perguntas;

    if (currentQuestion?.[answer].startsWith('resultado')) {
      navigation.navigate('Resultado', { resultadoId: nextQuestionId });
    } else {
      fadeAnim.setValue(0);
      slideAnim.setValue(50); // Redefine a posição para o efeito de deslizar
      navigation.navigate('Questionario', { perguntaId: nextQuestionId });
    }
  };

  // funcao que volta para primeira pergunta
  const resetar = () => {
    fadeAnim.setValue(0);
    slideAnim.setValue(50); // Redefine a posição para o efeito de deslizar
    navigation.navigate('Questionario', { perguntaId: "TemDisponibilidadeHídrica" });
  }

  if (!currentQuestion) {
    return (
      <Center flex={1} bg="gray.50">
        <Spinner color="blue.500" size="lg" />
        <Text mt={4} fontSize="lg" color="gray.500">
          Carregando...
        </Text>
      </Center>
    );
  }

  return (
    <Center flex={1} bg="gray.50" p={6}>
      <Animated.View style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }], // Animação combinada de opacidade e movimento vertical
        width: "100%",
        alignItems: "center"
      }}>
        <Box w="90%" maxW="400px" p={8} bg="white" borderRadius="xl" shadow={7}>
          <VStack space={6} alignItems="center">
            <Text fontSize="2xl" fontWeight="bold" color="blue.800" textAlign="center">
              {currentQuestion.pergunta}
            </Text>
            <Button
              onPress={() => handleAnswer('sim')}
              colorScheme="teal"
              w="100%"
              h="50px"
              borderRadius="full"
              _text={{ fontSize: "lg", fontWeight: "bold" }}
              shadow={2}
              _pressed={{ bg: "teal.600" }}
            >
              Sim
            </Button>
            <Button
              onPress={() => handleAnswer('nao')}
              colorScheme="amber"
              w="100%"
              h="50px"
              borderRadius="full"
              _text={{ fontSize: "lg", fontWeight: "bold" }}
              shadow={2}
              _pressed={{ bg: "amber.700" }}
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
