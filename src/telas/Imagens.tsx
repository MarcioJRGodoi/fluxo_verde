import type React from 'react';
import { useState } from 'react';
import { Dimensions, FlatList, Image, Modal, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { Telas } from '../interfaces/Telas';
import type { Route_Detalhes, Tecnologias } from '../interfaces/Perguntas';
import { tecnologiaImagens } from '../interfaces/Detalhes';

const Imagens: React.FC<{ route: Route_Detalhes }> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<Telas>>();
  const { tecnologiaId } = route.params;
  const tecnologia = tecnologiaId as Tecnologias;
  const caminhosImagens = tecnologiaImagens[tecnologia];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImage = (image: string) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  if (!caminhosImagens || caminhosImagens.length === 0) {
    return (
      <View style={styles.centerContent}>
        <Text style={styles.noImageText}>Nenhuma imagem disponível</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tecnologia}</Text>
      <View style={styles.imageContainer}>
        <FlatList
          horizontal
          data={caminhosImagens}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openImage(item)}>
              <View style={styles.imageWrapper}>
                {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
                <Image source={item as any} style={styles.image} resizeMode="cover" />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

      {selectedImage && (
        <Modal transparent visible={!!selectedImage} animationType="fade" onRequestClose={closeImage}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeImage} style={styles.modalBackground}>
              {/* biome-ignore lint/suspicious/noExplicitAny: <explanation> */}
              <Image source={selectedImage as any} style={styles.fullImage} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E7F6EF',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E7C58',
    textAlign: 'center',
    marginBottom: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  imageWrapper: {
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: Dimensions.get('window').width * 0.85,
    height: 220,
    borderRadius: 16,
  },
  button: {
    backgroundColor: '#38A169',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.7,
    borderRadius: 12,
  },
});

export default Imagens;
