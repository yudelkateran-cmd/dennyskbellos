const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        // Esto le dice a Vue que "@" equivale a la carpeta "src"
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  // Opcional: Esto ayuda si vas a subir la página a un subdominio o carpeta específica
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/'
})