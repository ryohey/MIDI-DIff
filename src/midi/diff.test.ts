import assert from "assert"
import fs from "fs"
import { parseMidiFile } from "../test/node-jasmid"
import * as jdiff from "jsondiffpatch"

const readMidi = (filepath: string) => {
  const midiData = new Uint8Array(fs.readFileSync(filepath)).buffer
  return parseMidiFile(midiData)
}

describe("diff", () => {
  it("should returns diff", () => {
    const midi1 = readMidi("./fixtures/template_c_d.mid")
    const midi2 = readMidi("./fixtures/template_c_e.mid")
    const diff = jdiff.diff(midi1, midi2)
    console.dir(JSON.stringify(diff, null, 2))
    assert.fail()
  })
})
