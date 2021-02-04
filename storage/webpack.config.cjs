import path from "path";

module.exports = {
  entry: './index.js',
  output: {
    filename: 'min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'schmuckliCloud'
  },
  mode: "production"
};
