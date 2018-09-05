// polyfill for jasmid
const { TextDecoder } = require("text-encoding")
global.TextDecoder = TextDecoder

module.exports = require("jasmid.ts")
