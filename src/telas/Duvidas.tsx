import type React from 'react';
import { useState } from 'react';
import { Text, Box, Center, FlatList, HStack, Pressable, VStack } from 'native-base';
import { Dimensions } from 'react-native';

const Duvidas: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    "É muito importante responder as perguntas corretamente, pois as respostas ajudarão a fornecer resultados precisos e relevantes para o seu diagnóstico.",
    "O questionário foi desenvolvido para coletar informações que serão analisadas para apresentar as melhores recomendações.",
    "Certifique-se de ler atentamente cada pergunta antes de responder. Isso garantirá que você obtenha o máximo de informações para tomar decisões informadas.",
    "Se você tiver dúvidas, pode sempre voltar para revisar suas respostas antes de finalizar."
  ];

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const slideSize = Math.min(windowWidth * 0.8, windowHeight * 0.5); // Quadrado proporcional à tela

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / slideSize); // Baseado no tamanho do quadrado
    setSlideIndex(newIndex);
  };

  return (
    <Center flex={1} bg="gray.50" p={6}>
      <Box
        w={`${slideSize}px`}
        h={`${slideSize}px`}
        maxW="400px"
        maxH="400px"
        bg="white"
        borderRadius="xl"
        shadow={7}
        overflow="hidden"
      >
        <FlatList
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          onScroll={handleScroll}
          renderItem={({ item }) => (
            <VStack
              width={slideSize} // Garante que cada slide seja do mesmo tamanho
              height={slideSize}
              justifyContent="center"
              alignItems="center"
              p={6}
            >
              <Text fontSize="lg" textAlign="center" color="gray.600">
                {item}
              </Text>
            </VStack>
          )}
        />
      </Box>

      {/* Indicador de página */}
      <HStack justifyContent="center" mt={4} space={2}>
        {slides.map((_, index) => (
          <Pressable
            key={_}
            w={3}
            h={3}
            borderRadius="full"
            bg={slideIndex === index ? 'blue.500' : 'gray.300'}
          />
        ))}
      </HStack>
    </Center>
  );
};

export default Duvidas;
