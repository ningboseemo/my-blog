const path = require('path')

function resolve (dir, isRoot) {
  if (isRoot) {
    return path.resolve(__dirname, '../', dir)
  } else {
    return path.resolve(__dirname, './', dir)
  }
}

module.exports = {
  resolve
}