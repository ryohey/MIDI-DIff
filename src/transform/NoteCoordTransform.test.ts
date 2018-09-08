import assert from "assert"
import { NoteCoordTransform, convertRect } from "./NoteCoordTransform"

describe("NoteCoordTransform", () => {
  const t: NoteCoordTransform = {
    pixelsPerTick: 100,
    pixelsPerKey: 30,
    maxNoteNumber: 127
  }
  const toRect = convertRect(t)

  it("convertRect1", () => {
    const r = toRect({
      tick: 0,
      note: 0,
      duration: 0
    })
    assert.equal(r.x, 0)
    assert.equal(r.y, 30 * 127)
  })

  it("convertRect2", () => {
    const r = toRect({
      tick: 1,
      note: 127,
      duration: 0
    })
    assert.equal(r.x, 100)
    assert.equal(r.y, 0)
  })
})
