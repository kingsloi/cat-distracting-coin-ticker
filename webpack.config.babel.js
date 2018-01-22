import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import paths from './config/paths';

function getNamesAndPaths(folder) {
  return fs.readdirSync(folder).reduce((accu, file) => {
    const fileName = path.basename(file, '.jsx');
    const filePath = path.join(folder, file);

    return Object.assign({}, accu, { [fileName]: filePath });
  }, {});
}

const webConfig = {
  entry: getNamesAndPaths(paths.dashboards),
  target: 'web',
  output: { path: paths.dist, filename: '[name].dashboard.bundle.js' },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: true },
        },
        include: [paths.dashboards, paths.widgets, paths.lib],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: [paths.styles, paths.widgets],
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'commons', filename: 'common.bundle.js' }),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(en)$/),
    // new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [path.resolve(__dirname), 'node_modules'],
  },
};

export default webConfig;
