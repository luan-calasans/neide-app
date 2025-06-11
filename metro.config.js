const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable Hermes optimizations
config.transformer = {
  ...config.transformer,
  minifierPath: 'metro-minify-terser',
  minifierConfig: {
    // Hermes-compatible minification
    keep_fnames: true,
    mangle: {
      keep_fnames: true,
    },
  },
};

// Resolver configuration for better compatibility
config.resolver = {
  ...config.resolver,
  assetExts: [...config.resolver.assetExts, 'cjs'],
  sourceExts: [...config.resolver.sourceExts, 'cjs'],
};

// Serializer configuration
config.serializer = {
  ...config.serializer,
  getModulesRunBeforeMainModule: () => [],
};

module.exports = config;
