process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

module.exports = environment.toWebpackConfig()

console.log(module.exports.module.rules[8])
