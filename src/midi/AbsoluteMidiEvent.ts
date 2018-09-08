import { Omit } from "../helpers/types"
import { MidiEvent } from "jasmid.ts/lib"

export type AbsoluteMidiEvent = Omit<MidiEvent, "deltaTime"> & {
  tick: number
}

interface BaseNoteEvent {
  type: "midi"
  tick: number
  channel: number
  note: number
  velocity: number
}

export type NoteOnEvent = BaseNoteEvent & {
  subType: "noteOn"
  typeByte: number
}

export type NoteOffEvent = BaseNoteEvent & {
  subType: "noteOff"
  typeByte: number
}

export type NoteEvent = BaseNoteEvent & {
  subType: "note"
  duration: number
}
