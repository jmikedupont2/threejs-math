'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./sketch-threejs-v2.cjs.production.js')
} else {
  module.exports = require('./sketch-threejs-v2.cjs.development.js')
}
