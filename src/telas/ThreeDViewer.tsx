import type React from "react";
import { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  type GestureResponderEvent,
  type PanResponderGestureState,
  type GestureResponderHandlers,
} from "react-native";
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Asset } from "expo-asset";

const ThreeDViewer: React.FC = () => {
  const renderRef = useRef<Renderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const lastTouchDistanceRef = useRef<number | null>(null);

  const rotationSensitivity = 0.002; // Sensibilidade de rotação ajustada
  const zoomSensitivity = 0.1; // Sensibilidade de zoom
  const zoomLimits = { min: 20, max: 50 }; // Limites de zoom

  useEffect(() => {
    return () => {
      if (renderRef.current) renderRef.current.dispose();
    };
  }, []);

  const onContextCreate = async (gl: WebGLRenderingContext & { endFrameEXP?: () => void }) => {
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderRef.current = renderer;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.z = 20; // Distância inicial da câmera
    cameraRef.current = camera;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 2, 2).normalize();
    scene.add(light);

    const asset = Asset.fromModule(require("../models/arvore.glb"));
    await asset.downloadAsync();

    const loader = new GLTFLoader();
    loader.load(
      asset.localUri || asset.uri,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, -0.5, 0);
        scene.add(model);
        modelRef.current = model;
      },
      undefined,
      (error) => {
        console.error("Erro ao carregar modelo GLB:", error);
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      if (gl.endFrameEXP) {
        gl.endFrameEXP();
      }
    };
    animate();
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      const touches = _e.nativeEvent.touches;

      // Zoom com gesto de pinça
      if (touches.length === 2 && cameraRef.current) {
        const touch1 = touches[0];
        const touch2 = touches[1];
        const distance = Math.sqrt(
          (touch2.pageX - touch1.pageX) ** 2 + (touch2.pageY - touch1.pageY) ** 2
        );

        if (lastTouchDistanceRef.current != null) {
          const delta = (lastTouchDistanceRef.current - distance) * zoomSensitivity;
          const newZoom = THREE.MathUtils.clamp(
            cameraRef.current.position.z + delta,
            zoomLimits.min,
            zoomLimits.max
          );
          cameraRef.current.position.z = newZoom;
        }
        lastTouchDistanceRef.current = distance;
      } else {
        lastTouchDistanceRef.current = null;

        // Rotação do modelo
        if (modelRef.current) {
          const deltaX = gestureState.dx * rotationSensitivity;
          const deltaY = gestureState.dy * rotationSensitivity;
          modelRef.current.rotation.y += deltaX;
          modelRef.current.rotation.x += deltaY;
        }
      }
    },
    onPanResponderRelease: () => {
      lastTouchDistanceRef.current = null;
    },
    onPanResponderEnd: () => {
      lastTouchDistanceRef.current = null;
    },
  });

  return (
    <View
      style={styles.container}
      {...(panResponder.panHandlers as GestureResponderHandlers)}
    >
      <GLView style={styles.glView} onContextCreate={onContextCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  glView: {
    width: "100%",
    height: "100%",
  },
});

export default ThreeDViewer;
