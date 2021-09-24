const { getDefaultConfig } = require("@expo/metro-config");

const { resolver: { sourceExts, assetExts } } = getDefaultConfig(__dirname);

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  },
  resolver: {
    sourceExts,
    assetExts: [...assetExts, "hcscript"]
  }
};

