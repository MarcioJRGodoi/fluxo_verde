import type React from "react";
import { useState } from "react";
import { Dimensions, FlatList, Image, Modal, StyleSheet, TouchableOpacity } from "react-native";
import { Box, Button, Center, Text, VStack } from "native-base";
import type { Route_Detalhes, Tecnologias } from "../interfaces/Perguntas";
import { tecnologiaImagens } from "../interfaces/Detalhes";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { Telas } from "../interfaces/Telas";

const Imagens: React.FC<{ route: Route_Detalhes }> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<Telas>>();

  const { tecnologiaId } = route.params;
  const tecnologia = tecnologiaId as Tecnologias;
  const caminhosImagens = tecnologiaImagens[tecnologia];

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [selectedImage, setSelectedImage] = useState<any | null>(null); // Alterado para aceitar o tipo correto

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const openImage = (image: any) => {
    console.log("Imagem clicada:", image); // Verificando qual imagem foi clicada
    setSelectedImage(image); // Define a imagem selecionada para exibir no modal
  };

  const closeImage = () => {
    setSelectedImage(null); // Fecha o modal
  };

  if (!caminhosImagens || caminhosImagens.length === 0) {
    return (
      <Center style={styles.centerContent}>
        <Text style={styles.noImageText}>Nenhuma imagem disponível</Text>
        <Button
          onPress={() => navigation.goBack()}
          colorScheme="blue"
          _text={styles.buttonText}
          _pressed={{ bg: "blue.700" }}
          style={styles.button}
        >
          Voltar
        </Button>
      </Center>
    );
  }

  return (
    <VStack style={styles.container}>
      <Text style={styles.title}>{tecnologia}</Text>
      <Box style={styles.imageContainer}>
        <FlatList
          horizontal
          data={caminhosImagens}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openImage(item)}>
              <Center style={styles.imageWrapper}>
                <Image
                  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  source={item as any} // Usando diretamente o objeto retornado pelo `require`
                  style={styles.image}
                  resizeMode="cover"
                />
              </Center>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </Box>
      <Button
        onPress={() => navigation.goBack()}
        colorScheme="blue"
        _text={styles.buttonText}
        _pressed={{ bg: "blue.700" }}
        style={styles.button}
      >
        Voltar
      </Button>

      {/* Modal para exibir a imagem ampliada */}
      {selectedImage && (
        <Modal
          visible={!!selectedImage}
          transparent
          animationType="fade"
          onRequestClose={closeImage}
        >
          <Center style={styles.modalContainer}>
            <TouchableOpacity onPress={closeImage} style={styles.modalBackground}>
              <Image
                source={selectedImage} // Usando o objeto da imagem no modal
                style={styles.fullImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </Center>
        </Modal>
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f4f4f8",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    paddingTop: 12,
    marginBottom: 24,
    textAlign: "center",
    color: "#222",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    fontSize: 18,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  imageWrapper: {
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
  },
  image: {
    width: Dimensions.get("window").width * 0.85,
    height: 220,
    borderRadius: 16,
  },
  button: {
    marginTop: 24,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
    backgroundColor: "#007bff",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Fundo semitransparente
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").height * 0.7,
    borderRadius: 12,
  },
});

export default Imagens;
