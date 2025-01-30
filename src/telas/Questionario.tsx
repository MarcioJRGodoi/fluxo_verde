import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { Box, Text, Button, VStack, Center, Spinner, HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { type Pergunta, perguntas } from '../perguntasHEHE/perguntas';
import type { Telas } from '../interfaces/Telas';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { Perguntas, Route_PerguntasRespostas } from '../interfaces/Perguntas';

const Questionario: React.FC<{ route: Route_PerguntasRespostas }> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<Telas>>();
  const [currentQuestion, setCurrentQuestion] = useState<Pergunta>();
  const { perguntaId } = route.params;
  const [historicoPerguntas, setHistoricoPerguntas] = useState<(keyof typeof Perguntas)[]>([]); // Histórico das perguntas respondidas
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const question = perguntaId !== undefined ? perguntas[perguntaId] : undefined;
    setCurrentQuestion(question);
  }, [perguntaId]);

  // Animação para transição entre perguntas
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentQuestion]);

  const handleAnswer = (answer: 'sim' | 'nao') => {
    const nextQuestionId = currentQuestion ? currentQuestion[answer] as keyof typeof Perguntas : "TemDisponibilidadeHídrica" as keyof typeof Perguntas;

    // Armazena a pergunta atual no histórico antes de avançar
    if (perguntaId !== undefined) {
      setHistoricoPerguntas(prev => [...prev, perguntaId]);
    }

    if (currentQuestion?.[answer].startsWith('resultado')) {
      navigation.navigate('Resultado', { resultadoId: nextQuestionId });
    } else {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        navigation.navigate('Questionario', { perguntaId: nextQuestionId, perguntaIdAnterior: perguntaId });
      });
    }
  };

  // Função para voltar para a pergunta anterior
  const voltarPergunta = () => {
    if (historicoPerguntas.length > 0) {
      const perguntaAnterior = historicoPerguntas[historicoPerguntas.length - 1];
      const novoHistorico = historicoPerguntas.slice(0, -1); // Remove a última pergunta do histórico

      // Atualiza o histórico e navega para a pergunta anterior
      setHistoricoPerguntas(novoHistorico);
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        navigation.navigate('Questionario', { perguntaId: perguntaAnterior, perguntaIdAnterior: undefined });
      });
    } else {
      // Caso o histórico esteja vazio, volta para a primeira pergunta
      navigation.navigate('Questionario', { perguntaId: "TemDisponibilidadeHídrica", perguntaIdAnterior: undefined });
    }
  };

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
    <Center flex={1} bg="#E7F6EF" px={4}>
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
          width: '100%',
          alignItems: 'center',
        }}
      >
        <VStack space={6} alignItems="center">
          <Text fontSize="xl" fontWeight="bold" color="#1E7C58" textAlign="center">
            {currentQuestion.pergunta}
          </Text>
          <HStack justifyContent="space-between" w="80%">
            <Button
              onPress={() => handleAnswer('sim')}
              bg="#38A169"
              borderRadius="full"
              px={8}
              _text={{ fontSize: "lg", color: "#FFF", fontWeight: "bold" }}
              _pressed={{ bg: "#2F855A" }}
            >
              Sim
            </Button>
            <Button
              onPress={() => handleAnswer('nao')}
              bg="#F6AD55"
              borderRadius="full"
              px={8}
              _text={{ fontSize: "lg", color: "#FFF", fontWeight: "bold" }}
              _pressed={{ bg: "#DD6B20" }}
            >
              Não
            </Button>
          </HStack>
        </VStack>
      </Animated.View>
      <Box position="absolute" bottom={8} w="80%">
        <Button
          onPress={voltarPergunta}  // Função de voltar para a pergunta anterior
          bg="#1E7C58"
          borderRadius="md"
          _text={{ fontSize: "sm", color: "#FFF", fontWeight: "bold" }}
          _pressed={{ bg: "#166746" }}
        >
          Voltar
        </Button>
      </Box>
    </Center>
  );
};

export default Questionario;
