module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: 'babel-loader',
    options: {
      presets: ['@babel/react', '@babel/typescript'],
    },
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
