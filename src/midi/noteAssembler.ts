import _ from "lodash"
import {
  AbsoluteMidiEvent,
  NoteEvent,
  NoteOnEvent,
  NoteOffEvent
} from "./AbsoluteMidiEvent"

/**

  assemble noteOn and noteOff to single note event to append duration

 */
export function assemble(
  events: AbsoluteMidiEvent[]
): (AbsoluteMidiEvent | NoteEvent)[] {
  const noteOnEvents: NoteOnEvent[] = []

  function findNoteOn(noteOff: NoteOffEvent): NoteOnEvent | null {
    const i = _.findIndex(noteOnEvents, e => {
      return e.channel === noteOff.channel && e.note === noteOff.note
    })
    if (i < 0) {
      return null
    }
    const e = noteOnEvents[i]
    noteOnEvents.splice(i, 1)
    return e
  }

  const result: (AbsoluteMidiEvent | NoteEvent)[] = []
  events.forEach(e => {
    switch (e.subType) {
      case "noteOn":
        noteOnEvents.push(e as NoteOnEvent)
        break
      case "noteOff": {
        const ev = e as NoteOffEvent
        const noteOn = findNoteOn(ev)
        if (noteOn != null) {
          const base = _.pick(
            noteOn,
            "type",
            "tick",
            "channel",
            "note",
            "velocity"
          )
          const note: NoteEvent = {
            ...base,
            subType: "note",
            duration: ev.tick - noteOn.tick
          }
          result.push(note)
        }
        break
      }
      default:
        result.push(e)
        break
    }
  })

  return result
}
