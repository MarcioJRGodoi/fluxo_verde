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

  const slideSize = Math.min(windowWidth * 0.85, windowHeight * 0.5); // Ajuste para melhor proporção

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / slideSize);
    setSlideIndex(newIndex);
  };

  return (
    <Center flex={1} bg="#E7F6EF" p={6}>
      <Box
        w={`${slideSize}px`}
        h={`${slideSize}px`}
        maxW="420px"
        maxH="420px"
        bg="white"
        borderRadius={20}
        shadow={5}
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
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
              width={slideSize}
              height={slideSize}
              justifyContent="center"
              alignItems="center"
              p={6}
            >
              <Text fontSize="lg" textAlign="center" color="#1E7C58" fontWeight="bold">
                {item}
              </Text>
            </VStack>
          )}
        />
      </Box>

      {/* Indicador de página */}
      <HStack justifyContent="center" mt={5} space={3}>
        {slides.map((_, index) => (
          <Pressable
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            w={4}
            h={4}
            borderRadius="full"
            bg={slideIndex === index ? '#1E7C58' : 'gray.400'}
          />
        ))}
      </HStack>
    </Center>
  );
};

export default Duvidas;
