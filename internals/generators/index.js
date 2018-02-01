/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const fs = require('fs')
const componentGenerator = require('./component/index.js')
const containerGenerator = require('./screen/index.js')

module.exports = plop => {
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('screen', containerGenerator)
  plop.addHelper('directory', comp => {
    try {
      fs.accessSync(`src/screens/${comp}`, fs.F_OK)
      return `screens/${comp}`
    } catch (e) {
      return `components/${comp}`
    }
  })
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'))
}
