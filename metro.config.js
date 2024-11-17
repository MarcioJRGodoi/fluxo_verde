const { getDefaultConfig } = require('expo/metro-config');

// Obtém a configuração padrão do Metro no Expo
const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('obj', 'glb', 'gltf', 'png', 'jpg'); // Adicione as extensões aqui

module.exports = defaultConfig;
