import type React from 'react';
import { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { Telas } from './interfaces/Telas';

const Home: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<Telas>>();
  const [showModal, setShowModal] = useState(false);

  // Verifica se é a primeira vez que o app é aberto
  useEffect(() => {
    const checkFirstTime = async () => {
      try {
        const primeiraVez = await AsyncStorage.getItem('primeiraVez');
        if (!primeiraVez) {
          setShowModal(true); // Exibe o modal
          await AsyncStorage.setItem('primeiraVez', 'true'); // Marca como visualizado
        }
      } catch (error) {
        console.error("Erro ao acessar o AsyncStorage:", error);
      }
    };

    checkFirstTime();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bem-vindo ao App de Escolhas de Tecnologia para Tratamento de Esgoto
      </Text>
      <Text style={styles.description}>
        Este aplicativo ajuda a selecionar as melhores tecnologias para o tratamento de esgoto,
        com base em diferentes critérios e situações específicas.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Questionario', { perguntaId: 'TemDisponibilidadeHídrica' })
        }
      >
        <Text style={styles.buttonText}>Vamos começar</Text>
      </TouchableOpacity>

      {/* Modal para mensagem inicial */}
      <Modal
        transparent={true}
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)} // Fecha o modal com o botão "Voltar" no Android
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Bem-vindo!</Text>
            <Text style={styles.modalBody}>
              Obrigado por instalar nosso aplicativo! 😊{"\n\n"}
              Esta é uma versão em desenvolvimento e pode conter alguns bugs.{"\n\n"}
              Sua experiência e opinião são muito importantes para nós! Se encontrar algum problema
              ou tiver sugestões, fique à vontade para enviar seu feedback.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 10,
  },
  modalBody: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
