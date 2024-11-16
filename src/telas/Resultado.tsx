import type React from 'react';
import { useState, useEffect } from 'react';
import { Box, Text, VStack, Button, Center, Divider } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { Telas } from '../interfaces/Telas';
import type { Route_PerguntasRespostas } from '../interfaces/Perguntas';
import { resultados } from '../perguntasHEHE/perguntas';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.65; // Ajustado para 60% da largura da tela
const ITEM_HEIGHT = 200;

const ResultScreen: React.FC<{ route: Route_PerguntasRespostas }> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<Telas>>();
  const { resultadoId } = route.params;
  const [result, setResult] = useState<string[]>([]);

  useEffect(() => {
    if (resultadoId !== undefined) {
      const resultTechnologies = resultados[resultadoId]?.resultado || [];
      setResult(resultTechnologies);
    }
  }, [resultadoId]);

  return (
    <Center flex={1} bg="gray.100" p={4}>
      <Box
        w="100%"
        maxW="95%"
        p={6}
        bg="white"
        borderRadius="lg"
        borderColor="blue.100"
        borderWidth={1}
        shadow={5}
      >
        <VStack space={4} alignItems="center">
          <Text fontSize="2xl" fontWeight="bold" color="blue.800" textAlign="center">
            Tecnologias Recomendadas
          </Text>
          <Divider my={4} bg="blue.300" />
          {result.length > 0 ? (
            <FlatList
              data={result}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToAlignment="center"
              // snapToInterval={ITEM_WIDTH + 16}
              decelerationRate="fast"
              contentContainerStyle={styles.carouselContainer}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item }) => (
                <Box
                  w={ITEM_WIDTH}
                  h={ITEM_HEIGHT}
                  justifyContent="center"
                  alignItems="center"
                  bg="blue.50"
                  borderRadius="md"
                  borderWidth={1}
                  borderColor="blue.200"
                  shadow={2}
                  p={4}
                  m={2}
                >
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color="blue.700"
                    textAlign="center"
                    numberOfLines={3} // Permite que o texto quebre em até 3 linhas
                    ellipsizeMode="tail" // Adiciona reticências se o texto ultrapassar o limite
                  >
                    {item}
                  </Text>
                  <Button
                    onPress={() => navigation.navigate('Detalhes', { tecnologiaId: item })}
                    colorScheme="blue"
                    mt={6}
                    w="60%"
                    _text={{ fontSize: 'lg', fontWeight: 'bold' }}
                    _pressed={{ bg: 'blue.700' }}
                  >
                    Detalhes
                  </Button>
                </Box>
              )}
            />
          ) : (
            <Text fontSize="md" color="gray.500" textAlign="center">
              Nenhuma tecnologia recomendada.
            </Text>
          )}
          <Button
            onPress={() => navigation.navigate('Home')}
            colorScheme="blue"
            mt={6}
            w="75%"
            _text={{ fontSize: 'lg', fontWeight: 'bold' }}
            _pressed={{ bg: 'blue.700' }}
          >
            Voltar para Início
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default ResultScreen;
