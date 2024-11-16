import React, { useRef, useEffect } from 'react';
import { View, Dimensions, PanResponder } from 'react-native';
import { GLView } from 'expo-gl';
import * as THREE from 'three';
import { Renderer } from 'expo-three';

const PanoramaViewer: React.FC = () => {
  const glViewRef = useRef(null);

  const { width, height } = Dimensions.get('window');

  // Referências globais para câmera, cena e esfera
  let camera: THREE.PerspectiveCamera;
  let scene: THREE.Scene;
  let renderer: Renderer;
  let sphere: THREE.Mesh;

  // PanResponder para manipular gestos
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        if (sphere) {
          sphere.rotation.y -= gesture.dx * 0.005; // Rotação horizontal
          sphere.rotation.x -= gesture.dy * 0.005; // Rotação vertical
        }
      },
    })
  ).current;

  const createPanorama = async (gl: any) => {
    // Configuração inicial do renderer
    renderer = new Renderer({ gl });
    renderer.setSize(width, height);

    // Criar a cena e a câmera
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 0.1;

    // Carregar a textura da imagem panorâmica
    const textureLoader = new THREE.TextureLoader();
    const texture = await textureLoader.loadAsync(
      require('../../assets/2294472375_24a3b8ef46_o.jpg') // Substitua pelo caminho da sua imagem
    );

    // Criar a esfera
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.BackSide, // Renderizar a parte interna da esfera
    });
    sphere = new THREE.Mesh(geometry, material);

    // Adicionar a esfera à cena
    scene.add(sphere);

    // Função de renderização
    const renderScene = () => {
      requestAnimationFrame(renderScene);
      renderer.render(scene, camera);
      gl.endFrameEXP(); // Finaliza o frame no Expo GL
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
