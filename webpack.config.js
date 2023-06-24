const path = require("path");

module.exports = {
  entry: "./src/index.mjs",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets/fonts/Montserrat_Alternates",
            limit: 8192, // Limit for embedding fonts as data URLs (adjust as needed)
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // Add other webpack configuration options as needed
};
