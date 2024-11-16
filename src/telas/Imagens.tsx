import type React from "react";
import { Dimensions, FlatList, Image, StyleSheet } from "react-native";
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

  if (!caminhosImagens || caminhosImagens.length === 0) {
    return (
      <Center style={styles.centerContent}>
        <Text style={styles.noImageText}>Nenhuma imagem disponível</Text>
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
            <Center style={styles.imageWrapper}>
              <Image
                source={typeof item === "string" ? { uri: item } : item}
                style={styles.image}
                resizeMode="cover"
              />
            </Center>
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
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
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
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: Dimensions.get("window").width * 0.8,
    height: 200,
    borderRadius: 12,
  },
  button: {
    marginTop: 20,
    alignSelf: "center",
    paddingHorizontal: 24,
    borderRadius: 4,
    backgroundColor: "#007bff",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default Imagens;
