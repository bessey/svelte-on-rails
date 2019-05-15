const { environment } = require('@rails/webpacker')

environment.loaders.append('svelte', {
  test: /\.(html|svelte)$/,
  exclude: /node_modules/,
  use: {
    loader: 'svelte-loader',
    options: {
      emitCss: true,
      hydratable: true,
    },
  },
})
environment.resolve = {
  mainFields: ['svelte', 'browser', 'module', 'main']
}

module.exports = environment
