const hypernova = require('hypernova/server');

hypernova({
  devMode: true,

  getComponent(name) {
    if (name === 'App.svelte') {
      return require('./app/javascript/components/App.svelte');
    }
    return null;
  },

  port: 3030,
});
