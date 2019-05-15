# Svelte On Rails

Just me experimenting with Svelte + Webpacker

## TODO

- SSR rendering, perhaps with Hypernova?
- Smoother Rails side API, ideally comparable to e.g. react-rails / hypernova `<%= render_component "App" %>`

## Analysis of size

At time of writing the App.js pack weighs in at 47KB gzipped.

```bash
# pre-requisite
yarn global add webpack-bundle-analyzer
# run webpack compiler in profiling mode
node_modules/.bin/webpack --config config/webpack/production.js --profile --json > stats.json
# analyze the output
node_modules/.bin/webpack-bundle-analyzer stats.json
```
