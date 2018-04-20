import path from 'path';
import nodeExternals from 'webpack-node-externals';

export default function config(env = {}) {
  return {
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-maps' : 'eval',
    target: 'node',
    externals: [nodeExternals()],
    entry: ['babel-polyfill', path.resolve(__dirname, './src/index.js')],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'server.bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    }
  };
}
