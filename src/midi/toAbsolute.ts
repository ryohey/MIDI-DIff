import { MidiEvent } from "jasmid.ts/lib"
import { AbsoluteMidiEvent } from "./AbsoluteMidiEvent"
import _ from "lodash"
import { Omit } from "../helpers/types"

export function toAbsolute(events: MidiEvent[]): AbsoluteMidiEvent[] {
  let tick = 0
  const result: AbsoluteMidiEvent[] = []
  for (let e of events) {
    tick += e.deltaTime
    const base = _.omit(e, "deltaTime") as Omit<MidiEvent, "deltaTime">
    result.push({
      ...base,
      tick
    })
  }
  return result
}
