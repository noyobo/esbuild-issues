const esbuild = require('esbuild');
const path = require('path');
esbuild
  .build({
    entryPoints: [
      path.resolve(__dirname, '../src/app.tsx'),
      path.resolve(__dirname, '../src/pages/home/index.tsx'),
    ],
    bundle: true,
    splitting: true,
    treeShaking: true,
    outdir: path.resolve(__dirname, '../dist'),
    format: 'esm',
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    external: [
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-thunk',
      'redux-actions',
      'redux-logger',
    ],
  })
  .catch(() => process.exit(1));
