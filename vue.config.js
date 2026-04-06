const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  
  // 1. Configuración de rutas para GitHub Pages
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Dennyskbellos/' 
    : '/',

  // 2. Carpeta de salida para que GitHub la reconozca
  outputDir: 'docs',

  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
})