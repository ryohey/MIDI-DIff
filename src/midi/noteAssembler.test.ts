import assert from "assert"
import { assemble } from "./noteAssembler"
import { NoteOnEvent, NoteOffEvent } from "./AbsoluteMidiEvent"

describe("assemble", () => {
  it("should assemble to an note", () => {
    const notes: (NoteOnEvent | NoteOffEvent)[] = [
      {
        type: "midi",
        subType: "noteOn",
        typeByte: 0,
        note: 14,
        tick: 93,
        velocity: 120,
        channel: 5
      },
      {
        type: "midi",
        subType: "noteOff",
        typeByte: 0,
        note: 14,
        tick: 193,
        velocity: 0,
        channel: 5
      }
    ]
    const result = assemble(notes)
    assert.equal(result.length, 1)
    assert.deepEqual(result[0], {
      type: "midi",
      subType: "note",
      note: 14,
      tick: 93,
      velocity: 120,
      channel: 5,
      duration: 100
    })
  })
})
