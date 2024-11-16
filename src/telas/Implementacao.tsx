import type React from 'react';
import { Box, Text, SectionList, VStack, Heading, Divider } from 'native-base';
import type { Route_Detalhes, Tecnologias } from '../interfaces/Perguntas';
import { descricaoTecnologiasDetalhada } from '../interfaces/Detalhes';

const Implementacao: React.FC<{ route: Route_Detalhes }> = ({ route }) => {
  const { tecnologiaId } = route.params;
  const tecnologia = tecnologiaId as Tecnologias;

  const detalhes = descricaoTecnologiasDetalhada[tecnologia];

  if (!detalhes) {
    return (
      <Box p={6} alignItems="center">
        <Text color="red.500" fontSize="lg">
          Detalhes da tecnologia não encontrados
        </Text>
      </Box>
    );
  }

  const { comoImplementar, oQuePrecisa } = detalhes;

  const sections = [
    { title: 'Como Implementar', data: comoImplementar },
    { title: 'O Que Precisa', data: oQuePrecisa },
  ];

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderSectionHeader={({ section: { title } }) => (
        <Box p={4} backgroundColor="gray.200">
          <Heading size="md" color="secondary.500" mb={2}>
            {title}
          </Heading>
          <Divider />
        </Box>
      )}
      renderItem={({ item }) => (
        <Box p={4}>
          <Text fontSize="md" color="gray.700">
            • {item}
          </Text>
        </Box>
      )}
      ListHeaderComponent={
        <Box p={6}>
          <Heading size="xl" mb={4} color="primary.500">
            {tecnologia}
          </Heading>
        </Box>
      }
      ListFooterComponent={<Box height={4} />} // Adiciona espaço ao final
    />
  );
};

export default Implementacao;
