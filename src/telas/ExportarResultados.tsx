import React, { useState, useCallback } from 'react';
import {
  Box,
  Text,
  Button,
  VStack,
  Center,
  HStack,
  Checkbox,
  ScrollView
} from 'native-base';
import { Alert } from 'react-native';
import { useResultadoDb } from '../db/Crud/useResultadoDb';
import { Resultado } from '../db/Models/Resultado';
import { Tecnologias } from '../interfaces/Perguntas';
import { Detalhes } from '../interfaces/tipos';
import { descricaoTecnologiasDetalhada } from '../interfaces/Detalhes';
import { gerarPDF } from '../utils/gerarPdf';
import { confirmDeletion } from '../utils/Alert';
import { useFocusEffect } from '@react-navigation/native';

const ExportarResultados: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const funcoes = useResultadoDb();

  // Função para buscar os dados do banco e atualizar o estado
  const fetchData = async () => {
    const res = await funcoes.select();
    setResultados(res);
  };

  // Executa fetchData toda vez que a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  // Alterna a seleção de um registro
  const toggleSelection = (id: number) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  // Função para exportar para PDF
  const exportarParaPDF = async () => {
    if (selectedIds.length === 0) {
      Alert.alert('Aviso', 'Selecione pelo menos um registro para exportar.');
      return;
    }

    setLoading(true);

    try {
      const resultadosSelecionados = resultados.filter((resultado) =>
        selectedIds.includes(resultado.id)
      );

      if (!resultadosSelecionados.length) {
        Alert.alert('Erro', 'Nenhum registro encontrado para exportação.');
        return;
      }

      const tecnologia = resultadosSelecionados.flatMap((resultado) =>
        resultado.resultados.map((res) => res)
      ) as unknown as Tecnologias[];

      await gerarPDF({ detalhes: descricaoTecnologiasDetalhada as Detalhes, tecnologia });
      Alert.alert('Sucesso', 'PDF gerado e salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao gerar o PDF.');
    } finally {
      setLoading(false);
    }
  };

  // Função que lida com a deleção e atualiza o estado
  const handleDelete = async (resultado: Resultado) => {
    try {
      await confirmDeletion(
        'Confirmação',
        'Tem certeza que deseja deletar este item?'
      );
      await funcoes.deletar({ id: resultado.id });
      // Atualiza o estado removendo o item deletado
      setResultados((prevResult) =>
        prevResult.filter((item) => item.id !== resultado.id)
      );
      // Remove o item também dos selecionados, se necessário
      setSelectedIds((prevSelectedIds) =>
        prevSelectedIds.filter((id) => id !== resultado.id)
      );
      Alert.alert('Sucesso', 'Item deletado com sucesso!');
    } catch (error) {
      console.log('Operação cancelada ou erro:', error);
    }
  };

  return (
    <Center flex={1} bg="#E7F6EF" px={4}>
      <VStack space={6} alignItems="center" w="100%">
        <Text fontSize="xl" fontWeight="bold" color="#1E7C58" textAlign="center">
          Exportar Resultados para PDF
        </Text>
        <Box w="100%" bg="white" p={4} borderRadius="md" shadow={2}>
          <ScrollView>
            <VStack space={4}>
              {resultados.map((resultado) => (
                <HStack key={resultado.id} justifyContent="space-between" alignItems="center">
                  <Checkbox
                    value={String(resultado.id)}
                    isChecked={selectedIds.includes(resultado.id)}
                    onChange={() => toggleSelection(resultado.id)}
                    accessibilityLabel="Selecionar registro"
                  ><></></Checkbox>
                  <VStack flex={1} ml={2}>
                    <Text fontSize="md" color="gray.700">
                      {resultado.resultados}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {resultado.created_at}
                    </Text>
                  </VStack>
                  <Button
                    onPress={async () => await handleDelete(resultado)}
                    bg="#E53E3E"
                    borderRadius="md"
                    _text={{ fontSize: 'sm', color: '#FFF', fontWeight: 'bold' }}
                    _pressed={{ bg: '#C53030' }}
                  >
                    Deletar
                  </Button>
                </HStack>
              ))}
            </VStack>
          </ScrollView>
        </Box>
        <Button
          onPress={exportarParaPDF}
          bg="#1E7C58"
          borderRadius="md"
          _text={{ fontSize: 'lg', color: '#FFF', fontWeight: 'bold' }}
          _pressed={{ bg: '#166746' }}
          isLoading={loading}
          isLoadingText="Gerando PDF..."
        >
          Exportar para PDF
        </Button>
      </VStack>
    </Center>
  );
};

export default ExportarResultados;
