import type React from "react";
import { useRef } from "react";
import { View, StyleSheet, PanResponder, Dimensions } from "react-native";
import { GLView, type ExpoWebGLRenderingContext } from "expo-gl";
import { Renderer } from "expo-three";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Asset } from "expo-asset";



const { width, height } = Dimensions.get("window");

const Visao3D: React.FC = () => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const target = useRef(new THREE.Vector3(0, 0, 0)); // Centro da órbita
  const spherical = useRef(new THREE.Spherical(15, Math.PI / 2, 0)); // Distância e ângulos da órbita

  let lastX = 0;
  let lastY = 0;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (_, gestureState) => {
      lastX = gestureState.x0;
      lastY = gestureState.y0;
    },
    onPanResponderMove: (_, gestureState) => {
      if (!cameraRef.current) return;

      const deltaX = (gestureState.moveX - lastX) * 0.01; // Sensibilidade horizontal
      const deltaY = (gestureState.moveY - lastY) * 0.01; // Sensibilidade vertical

      spherical.current.theta += deltaX; // Inverte a rotação horizontal
      spherical.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.current.phi - deltaY));


      updateCameraPosition();

      lastX = gestureState.moveX;
      lastY = gestureState.moveY;
    },
  });

  const updateCameraPosition = () => {
    if (!cameraRef.current) return;

    const { radius, phi, theta } = spherical.current;
    cameraRef.current.position.set(
      radius * Math.sin(phi) * Math.cos(theta) + target.current.x,
      radius * Math.cos(phi) + target.current.y,
      radius * Math.sin(phi) * Math.sin(theta) + target.current.z
    );

    cameraRef.current.lookAt(target.current);
  };

  const handleContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    cameraRef.current = camera;
    updateCameraPosition();

    // Luzes
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Carregar modelo 3D
    const loader = new GLTFLoader();
    const modelAsset = Asset.fromModule(require("../models/Horse.glb"));
    await modelAsset.downloadAsync();

    loader.load(
      modelAsset.uri,
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);

        // Centralizar o modelo
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        target.current.copy(center); // Define o ponto de órbita no centro do modelo

        updateCameraPosition(); // Atualiza a posição da câmera com o novo centro

        // Loop de renderização
        const render = () => {
          requestAnimationFrame(render);
          renderer.render(scene, camera);
          gl.endFrameEXP();
        };

        render();
      },
      undefined,
      (error) => {
        console.error("Erro ao carregar o modelo GLB:", error);
      }
    );
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <GLView style={{ flex: 1 }} onContextCreate={handleContextCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default Visao3D;
