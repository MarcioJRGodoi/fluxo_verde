import type React from 'react';
import { useRef } from 'react';
import { View, Dimensions, PanResponder } from 'react-native';
import { GLView } from 'expo-gl';
import * as THREE from 'three';
import { Renderer } from 'expo-three';
import { Asset } from 'expo-asset';

const PanoramaViewer: React.FC = () => {
  const glViewRef = useRef(null);
  const { width, height } = Dimensions.get('window');

  let camera: THREE.PerspectiveCamera;
  let scene: THREE.Scene;
  let renderer: Renderer;
  let sphere: THREE.Mesh;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        if (sphere) {
          sphere.rotation.y -= gesture.dx * 0.005;
          sphere.rotation.x = THREE.MathUtils.clamp(
            sphere.rotation.x - gesture.dy * 0.005,
            -Math.PI / 2,
            Math.PI / 2
          );
        }
      },
    })
  ).current;

  const createPanorama = async (gl: any) => {
    renderer = new Renderer({ gl });
    renderer.setSize(width, height);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Fundo preto para verificar renderização

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 0.1; // Posição dentro da esfera

    const textureLoader = new THREE.TextureLoader();
    const imageAsset = Asset.fromModule(require('../../assets/imagens/2294472375_24a3b8ef46_o.jpg'));
    await imageAsset.downloadAsync();

    const texture = await textureLoader
      .loadAsync(imageAsset.localUri || imageAsset.uri)
      .catch((error) => {
        console.error("Erro ao carregar textura:", error);
        return null;
      });

    const fallbackMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Material vermelho como fallback
    const material = texture
      ? new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide })
      : fallbackMaterial;

    const geometry = new THREE.SphereGeometry(10, 60, 40);
    sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const renderScene = () => {
      requestAnimationFrame(renderScene);
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    renderScene();
  };

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <GLView
        style={{ flex: 1 }}
        onContextCreate={createPanorama}
        ref={glViewRef}
      />
    </View>
  );
};

export default PanoramaViewer;
