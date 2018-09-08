import { IRect } from "../geometry"

export interface NoteCoordTransform {
  pixelsPerTick: number
  pixelsPerKey: number
  maxNoteNumber: number
}

export interface NotePosition {
  tick: number
  note: number
  duration: number
}

export const convertRect = (t: NoteCoordTransform) => (
  note: NotePosition
): IRect => ({
  x: note.tick * t.pixelsPerTick,
  y: (t.maxNoteNumber - note.note) * t.pixelsPerKey,
  width: note.duration * t.pixelsPerTick,
  height: t.pixelsPerKey
})
