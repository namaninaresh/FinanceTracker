module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _assets: './src/assets',
          _components: './src/components',
          _atoms: './src/components/atoms',
          _molecules: './src/components/molecules',
          _navigations: './src/navigations',
          _screens: './src/screens',
          _styles: './src/styles',
          _utils: './src/utils',
        },
      },
    },
  },
};
