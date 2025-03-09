import type React from 'react';
import { useState } from 'react';
import { Box, Text, Button, VStack, Center, HStack } from 'native-base';
import { Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

const ExportarResultados: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // Dados de exemplo (substitua pelos seus resultados reais)
  const resultados = [
    { pergunta: 'Tem disponibilidade hídrica?', resposta: 'Sim' },
    { pergunta: 'Tem solo fértil?', resposta: 'Não' },
    { pergunta: 'Tem acesso a insumos?', resposta: 'Sim' },
  ];

  // Função para gerar o conteúdo HTML do PDF
  const gerarHTML = () => {
    const rows = resultados
      .map(
        (resultado, index) => `
        <tr>
          <td style="padding: 8px; border: 1px solid #ccc;">${index + 1}</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${resultado.pergunta}</td>
          <td style="padding: 8px; border: 1px solid #ccc;">${resultado.resposta}</td>
        </tr>
      `
      )
      .join('');

    return `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #1E7C58; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { background-color: #1E7C58; color: white; padding: 10px; text-align: left; }
            td { padding: 8px; border: 1px solid #ccc; }
          </style>
        </head>
        <body>
          <h1>Resultados do Questionário</h1>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Pergunta</th>
                <th>Resposta</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </body>
      </html>
    `;
  };

  // Função para gerar e exportar o PDF
  const exportarParaPDF = async () => {
    setLoading(true);

    try {
      const html = gerarHTML();

      // Gera o PDF a partir do HTML
      const { uri } = await Print.printToFileAsync({ html });

      // Compartilha o PDF
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'Resultados do Questionário',
        UTI: 'com.adobe.pdf',
      });

      Alert.alert('Sucesso', 'PDF gerado e compartilhado com sucesso!');
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao gerar o PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center flex={1} bg="#E7F6EF" px={4}>
      <VStack space={6} alignItems="center" w="100%">
        <Text fontSize="xl" fontWeight="bold" color="#1E7C58" textAlign="center">
          Exportar Resultados para PDF
        </Text>

        <Box w="100%" bg="white" p={4} borderRadius="md" shadow={2}>
          <VStack space={4}>
            {resultados.map((resultado, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<HStack key={index} justifyContent="space-between">
                <Text fontSize="md" color="gray.700">
                  {resultado.pergunta}
                </Text>
                <Text fontSize="md" color="gray.700" fontWeight="bold">
                  {resultado.resposta}
                </Text>
              </HStack>
            ))}
          </VStack>
        </Box>

        <Button
          onPress={exportarParaPDF}
          bg="#1E7C58"
          borderRadius="md"
          _text={{ fontSize: "lg", color: "#FFF", fontWeight: "bold" }}
          _pressed={{ bg: "#166746" }}
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