import React, { useState, useEffect } from 'react';
import { Box, Text, Button, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Pergunta, perguntas } from '../perguntasHEHE/perguntas';
import { Telas } from '../tipos/Telas';
import { StackNavigationProp } from '@react-navigation/stack';

const QuestionScreen: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<Telas>>();
  const [currentQuestion, setCurrentQuestion] = useState<Pergunta>();
  const { questionId } = route.params;

  useEffect(() => {
    const question = perguntas[questionId];
    setCurrentQuestion(question);
  }, [questionId]);
 
  const handleAnswer = (answer: 'sim' | 'nao') => {
    const nextQuestionId = currentQuestion ? currentQuestion[answer] : '';
    if (currentQuestion?.nao.startsWith('resultado') || currentQuestion?.sim.startsWith('resultado')) {
      navigation.navigate('Resultado', { resultadoId: nextQuestionId });
    } else {
      navigation.navigate('Questionario', { perguntaId: nextQuestionId });
    }
  };

  if (!currentQuestion) {
    return <Text>Carregando...</Text>;
  }

  return (
    <Box flex={1} justifyContent="center" alignItems="center" p={4} bg="white">
      <VStack space={6} alignItems="center">
        <Text fontSize="xl" fontWeight="bold" color="blue.800">
          {currentQuestion.pergunta}
        </Text>
        <Button onPress={() => handleAnswer('sim')} colorScheme="blue" w="75%">
          Sim
        </Button>
        <Button onPress={() => handleAnswer('nao')} colorScheme="red" w="75%">
          Não
        </Button>
      </VStack>
    </Box>
  );
};

export default QuestionScreen;
