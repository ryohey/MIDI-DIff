const { changeExtension } = require("./utils")
const jasmid = require("./node-jasmid")
const fs = require("fs")

const input = process.argv[2]
const output = process.argv[3] || changeExtension(input, ".json")
const midiData = new Uint8Array(fs.readFileSync(input)).buffer
const midi = jasmid.parseMidiFile(midiData)

fs.writeFileSync(output, JSON.stringify(midi))
