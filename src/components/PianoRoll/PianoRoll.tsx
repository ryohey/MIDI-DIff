import React from "react"
import { Stage } from "@inlet/react-pixi"
import { Keys } from "./Keys"
import { Grid } from "./Grid"
import midi from "../../template_c_e.json"
import { toAbsolute } from "../../midi/toAbsolute"
import { MidiEvent } from "jasmid.ts/lib"
import { assemble } from "../../midi/noteAssembler"
import { NoteEvent, AbsoluteMidiEvent } from "../../midi/AbsoluteMidiEvent"
import { Notes } from "./Notes"

const numberOfKeys = 127
const keyHeight = 16
const keyWidth = 50
const stageWidth = 1500
const stageHeight = numberOfKeys * keyHeight

// TODO: Diff を表示できるようにする
// TODO: 複数の Hunk を表示できるようにする

const filterNotes = (e: AbsoluteMidiEvent | NoteEvent): e is NoteEvent =>
  e.subType === "note"

export const PianoRoll = () => {
  const events = midi.tracks[1] as MidiEvent[]
  const notes = assemble(toAbsolute(events)).filter(filterNotes)
  return (
    <Stage
      width={stageWidth}
      height={stageHeight}
      options={{ antialias: true, backgroundColor: 0xffffff }}
    >
      <Grid
        numberOfKeys={numberOfKeys}
        keyHeight={keyHeight}
        width={stageWidth}
      />
      <Keys
        numberOfKeys={numberOfKeys}
        keyHeight={keyHeight}
        width={keyWidth}
      />
      <Notes
        notes={notes}
        transform={{
          pixelsPerKey: keyHeight,
          pixelsPerTick: 1,
          maxNoteNumber: numberOfKeys
        }}
      />
    </Stage>
  )
}
