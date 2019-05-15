const environment = require("./environment")
const merge = require("webpack-merge")

// React Server Side Rendering webpacker config
// Builds a Node compatible file that Hypernova can load, never served to the client.

const serverEnvironment = merge(environment.toWebpackConfig(), {
  target: "node",
  entry: "./app/javascript/packs/server.js",
  output: {
    filename: "server.js",
    path: environment.config.output.path,
    libraryTarget: "commonjs",
  },
})

// This removes the Manifest and HMR generation plugin from the Server.
// Manifest overwrites the _real_ client manifest, required by Rails.
// HMR just doesn't make sense on the server.
serverEnvironment.plugins = serverEnvironment.plugins
  .filter(plugin => plugin.constructor.name !== "ManifestPlugin")
  .filter(plugin => plugin.constructor.name !== "HotModuleReplacementPlugin")
  .filter(plugin => plugin.constructor.name !== "BundleAnalyzerPlugin")

module.exports = serverEnvironment
