// PdfMake.ts
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';
import type { Detalhes } from '../interfaces/tipos';
import { Tecnologias } from '../interfaces/Perguntas';
import { gerarHTMLDetalhes } from './PdfMake';

export const gerarPDF = async ({
  detalhes,
  tecnologia,
}: {
  detalhes: Detalhes;
  tecnologia: Tecnologias[];
}) => {
  try {
    // Gera o HTML usando a função que formata os detalhes da tecnologia
    const html = gerarHTMLDetalhes(tecnologia, detalhes);

    // Gera o arquivo PDF a partir do HTML
    const { uri } = await Print.printToFileAsync({ html });
    const pdfName = `Detalhes_${tecnologia}_${Date.now()}.pdf`;
    const newUri = `${FileSystem.documentDirectory}${pdfName}`;

    // Copia o arquivo gerado para o diretório de documentos
    await FileSystem.copyAsync({
      from: uri,
      to: newUri,
    });

    // Compartilha o PDF gerado
    await Sharing.shareAsync(newUri, {
      mimeType: 'application/pdf',
      dialogTitle: 'Detalhes da Tecnologia',
      UTI: 'com.adobe.pdf',
    });

    Alert.alert('Sucesso', 'PDF gerado e salvo com sucesso!');
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    Alert.alert('Erro', 'Ocorreu um erro ao gerar o PDF.');
    throw error;
  }
};
