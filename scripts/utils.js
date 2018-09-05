const path = require("path")

module.exports.changeExtension = (filepath, ext) =>
  path.format({ ...path.parse(filepath), base: undefined, ext })
