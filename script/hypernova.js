const hypernova = require('hypernova/server');

const env = process.env.NODE_ENV || "development"
const devMode = env === "development"

hypernova({
  devMode,

  getComponent: name => {
    console.log("WELL I RAN")
    // Allow iteration in dev, because require is cached otherwise
    if (devMode) {
      delete require.cache[require.resolve("../public/packs/server.js")]
    }

    let next = require("../public/packs/server.js")

    if (next[name]) return next[name]
    throw new Error(
      `Could not find component named ${name} in packs/hypernova-server.js, ensure you exported it with the name ${name}`
    )
  },

  port: 3030,
});
