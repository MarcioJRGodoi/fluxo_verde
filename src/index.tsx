import type React from 'react';
import { useEffect, useState, useRef } from 'react';
import { Box, Text, Button, VStack, Center, AlertDialog } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { Telas } from './interfaces/Telas';
// Importando a biblioteca de permissões para Android
import * as MediaLibrary from 'expo-media-library';

const Home: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<Telas>>();
  const [showDialog, setShowDialog] = useState(true);
  const cancelRef = useRef(null); // Referência para o botão não destrutivo


  // useEffect(() => {
  //   const EPrimeiravez = async () => {
  //     const primeira = await AsyncStorage.getItem('primeira');
  //     if (!primeira) {
  //       setShowDialog(true);
  //       await AsyncStorage.setItem('primeira', 'true');
  //     }
  //   };

  //   EPrimeiravez();
  // }, []);

  return (
    <Center flex={1} bg="blue.50" p={6}>
      <Box
        w="90%"
        maxW="400px"
        p={8}
        bg="white"
        borderRadius="lg"
        shadow={5}
        alignItems="center"
        borderColor="blue.100"
        borderWidth={1}
      >
        <VStack space={6} alignItems="center">
          <Text fontSize="2xl" fontWeight="bold" color="blue.900" textAlign="center">
            Bem-vindo ao App de Escolhas de Tecnologia para Tratamento de Esgoto
          </Text>
          <Text fontSize="md" color="gray.600" textAlign="center" lineHeight="lg" px={2}>
            Este aplicativo ajuda a selecionar as melhores tecnologias para o tratamento de esgoto,
            com base em diferentes critérios e situações específicas.
          </Text>
          <Button
            onPress={() =>
              navigation.navigate('Questionario', { perguntaId: 'TemDisponibilidadeHídrica' })
            }
            colorScheme="blue"
            size="lg"
            mt={4}
            w="75%"
            _text={{ fontSize: 'md', fontWeight: 'bold' }}
            _pressed={{ bg: 'blue.700' }}
          >
            Vamos começar
          </Button>
        </VStack>
      </Box>

      {/* Dialog para mensagem inicial */}
      {/* <AlertDialog
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
        leastDestructiveRef={cancelRef} // Referência para o botão não destrutivo
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Bem-vindo!</AlertDialog.Header>
          <AlertDialog.Body>
            <Text mb={2}>
              Obrigado por instalar nosso aplicativo! 😊
            </Text>
            <Text mb={2}>
              Esta é uma versão em desenvolvimento e pode conter alguns bugs.
            </Text>
            <Text>
              Sua experiência e opinião são muito importantes para nós! Se encontrar algum problema ou tiver sugestões,
              fique à vontade para enviar seu feedback.
            </Text>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button ref={cancelRef} onPress={() => setShowDialog(false)} colorScheme="blue">
              Continuar
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog> */}
    </Center>
  );
};

export default Home;
