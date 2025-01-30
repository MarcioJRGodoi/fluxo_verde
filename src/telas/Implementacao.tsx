import type React from 'react';
import { Box, Text, VStack, Heading, Divider, ScrollView } from 'native-base';
import type { Route_Detalhes, Tecnologias } from '../interfaces/Perguntas';
import { descricaoTecnologiasDetalhada } from '../interfaces/Detalhes';

const Implementacao: React.FC<{ route: Route_Detalhes }> = ({ route }) => {
  const { tecnologiaId } = route.params;
  const tecnologia = tecnologiaId as Tecnologias;

  const detalhes = descricaoTecnologiasDetalhada[tecnologia];

  if (!detalhes) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center" bg="#E7F6EF" p={6}>
        <Text color="red.600" fontSize="lg" fontWeight="bold">
          Detalhes da tecnologia não encontrados
        </Text>
      </Box>
    );
  }

  const { comoImplementar, oQuePrecisa } = detalhes;

  return (
    <ScrollView flex={1} bg="#E7F6EF" p={6}>
      <Heading size="xl" color="#1E7C58" mb={6} textAlign="center">
        {tecnologia}
      </Heading>

      <Box bg="#C3E6D0" p={4} borderRadius={12} mb={4} shadow={2} marginBottom={10}>
        <Heading size="md" color="#1E7C58" mb={2}>
          Como Implementar
        </Heading>
        <Divider bg="#1E7C58" mb={2} />
        {comoImplementar.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <Text key={index} fontSize="md" color="#374151" mb={2}>
            • {item}
          </Text>
        ))}
      </Box>

      <Box bg="#C3E6D0" p={4} borderRadius={12} shadow={2} marginBottom={20}>
        <Heading size="md" color="#1E7C58" mb={2}>
          O Que Precisa
        </Heading>
        <Divider bg="#1E7C58" mb={2} />
        {oQuePrecisa.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <Text key={index} fontSize="md" color="#374151" mb={2}>
            • {item}
          </Text>
        ))}
      </Box>
    </ScrollView>
  );
};

export default Implementacao;
