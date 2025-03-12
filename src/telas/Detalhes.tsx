import type React from "react";
import { Box, Text, VStack, HStack, Button, Center, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { Telas } from "../interfaces/Telas";
import { descricaoTecnologiasDetalhada } from "../interfaces/Detalhes";
import type { Route_Detalhes, Tecnologias } from "../interfaces/Perguntas";

// Estilo global para o botão
const buttonStyle = {
  bg: "rgba(56, 161, 105, 1)", // Verde com transparência
  _text: { fontSize: 'sm', fontWeight: 'bold' },
  _pressed: { bg: 'rgba(56, 161, 105, 0.7)' }, // Efeito quando pressionado
};

const Detalhes: React.FC<{ route: Route_Detalhes }> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<Telas>>();
  const { tecnologiaId } = route.params;
  const tecnologia = tecnologiaId as Tecnologias;
  const detalhes = descricaoTecnologiasDetalhada[tecnologia];

  // Funções de placeholder
  const verImagens = () => navigation.navigate("Imagens", { tecnologiaId: tecnologia });
  const visualizacao3D = () => navigation.navigate("Visao3D");
  const visualizacaoVR_AR = () => navigation.navigate("PanoramaViewer", { tecnologiaId: tecnologia });
  const explicacaoDetalhada = () => navigation.navigate("Implementacao", { tecnologiaId: tecnologia });

  return (
    <Center flex={1} bg="#E7F6EF" p={6}>
      <Box
        w="95%"
        maxW="95%"
        p={6}
        bg="white"
        borderRadius={15}
        borderColor="#1E7C58"
        borderWidth={1}
        shadow={5}
      >
        <VStack space={4} alignItems="center">
          <Text fontSize="2xl" fontWeight="bold" color="#1E7C58" textAlign="center">
            {tecnologia}
          </Text>
          <Text fontSize="md" fontWeight="semibold" color="#1E7C58" textAlign="center" mb={2}>
            {detalhes.descricaoCurta}
          </Text>
          <ScrollView maxH="50%" w="100%">
            <Text fontSize="sm" color="#374151" textAlign="justify" p={2}>
              {detalhes.descricaoDetalhada}
            </Text>
          </ScrollView>

          {/* Grade para os botões */}
          <VStack space={2} w="100%" mt={4} alignItems="center">
            <HStack space={2} w="100%" justifyContent="center">
              <Button
                onPress={verImagens}
                flex={1}
                {...buttonStyle} // Aplicando o estilo global
              >
                Ver Imagens
              </Button>
              {/* <Button onPress={visualizacao3D} {...buttonStyle}>
                Visualização 3D
              </Button> */}
            </HStack>
            <HStack space={2} w="100%" justifyContent="center">
              {/* <Button onPress={visualizacaoVR_AR} {...buttonStyle}>
                Visualização VR/AR
              </Button> */}
              <Button
                onPress={explicacaoDetalhada}
                flex={1}
                {...buttonStyle} // Aplicando o estilo global
              >
                Explicação Detalhada
              </Button>
            </HStack>
          </VStack>

          {/* Botão para voltar */}
          <Button
            onPress={() => navigation.goBack()}
            {...buttonStyle} // Aplicando o estilo global
            mt={6}
            w="75%"
          >
            Voltar
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};

export default Detalhes;
