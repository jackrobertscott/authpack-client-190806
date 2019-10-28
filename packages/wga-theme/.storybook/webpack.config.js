const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: 'babel-loader',
    options: {
      presets: ['@babel/react', '@babel/typescript'],
    },
  })
  config.resolve.extensions.push('.ts', '.tsx')
  config.plugins.push(new MonacoWebpackPlugin())
  return config
}
