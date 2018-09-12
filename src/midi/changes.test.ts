import assert from "assert"
import { changes } from "./changes"
import {
  NoteOnEvent,
  NoteOffEvent,
  AbsoluteMidiEvent
} from "./AbsoluteMidiEvent"

const noteOn = (note: number, tick: number, velocity = 127): NoteOnEvent => ({
  type: "midi",
  subType: "noteOn",
  typeByte: 0,
  note,
  tick,
  velocity,
  channel: 1
})

const noteOff = (note: number, tick: number, velocity = 0): NoteOffEvent => ({
  type: "midi",
  subType: "noteOff",
  typeByte: 0,
  note,
  tick,
  velocity,
  channel: 1
})

describe("diff", () => {
  it("should returns no changes", () => {
    const events1 = [noteOn(64, 0), noteOff(64, 10)]
    const events2 = [noteOn(64, 0), noteOff(64, 10)]
    const diff = changes(events1, events2)
    assert.deepEqual(diff, [])
  })
  it("should returns added changes", () => {
    const events1: AbsoluteMidiEvent[] = []
    const events2 = [noteOn(64, 0), noteOff(64, 10)]
    const diff = changes(events1, events2)
    assert.deepEqual(diff, [
      {
        type: "added",
        index: 0,
        value: noteOn(64, 0)
      },
      {
        type: "added",
        index: 1,
        value: noteOff(64, 10)
      }
    ])
  })
  it("should returns modified changes", () => {
    const events1 = [noteOn(64, 0), noteOff(64, 10)]
    const events2 = [noteOn(65, 0), noteOff(65, 10)]
    const diff = changes(events1, events2)
    assert.deepEqual(diff, [
      {
        type: "modified",
        index: 0,
        oldValue: noteOn(64, 0),
        newValue: noteOn(65, 0)
      },
      {
        type: "modified",
        index: 1,
        oldValue: noteOff(64, 10),
        newValue: noteOff(65, 10)
      }
    ])
  })
  it("should returns deleted changes", () => {
    const events1 = [noteOn(64, 0), noteOff(64, 10)]
    const events2: AbsoluteMidiEvent[] = []
    const diff = changes(events1, events2)
    assert.deepEqual(diff, [
      {
        type: "deleted",
        index: 0,
        value: noteOn(64, 0)
      },
      {
        type: "deleted",
        index: 1,
        value: noteOff(64, 10)
      }
    ])
  })
})
