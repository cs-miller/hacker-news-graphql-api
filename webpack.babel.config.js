import path from 'path';

export default function config(env) {
  return {
    mode: env.production ? 'production' : 'developement',
    devtool: env.production ? 'source-maps' : 'eval',
    entry: path.resolve(__dirname, '/src/index.js'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      fileName: 'server.bundle.js'
    }
  };
}
