const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],

  // для отладки из VS Code, https://github.com/microsoft/vscode-recipes/tree/main/vuejs-cli
  configureWebpack: {
    devtool: "source-map"
  },
  // transpileDependencies: true,
})
