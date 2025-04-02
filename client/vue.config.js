const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        "window.Quill": "quill/dist/quill.js",  // Expose Quill dans l'objet global
        Quill: "quill/dist/quill.js"  // Rend Quill accessible partout dans ton projet
      })
    ]
  }
});
