import React from "react"
import { SFC } from "react"
import { NoteEvent } from "../../midi/AbsoluteMidiEvent"
import { Container } from "@inlet/react-pixi"
import {
  NoteCoordTransform,
  convertRect
} from "../../transform/NoteCoordTransform"
import { RoundedRectangle } from "./PixiComponents"
import { roundRect } from "../../geometry"

export type ColoredNote = NoteEvent & {
  color: number
}

export interface NotesProps {
  x?: number
  y?: number
  notes: ColoredNote[]
  transform: NoteCoordTransform
}

export const Notes: SFC<NotesProps> = ({ x = 0, y = 0, notes, transform }) => {
  const toRect = convertRect(transform)
  const rects = notes.map(n => ({ ...roundRect(toRect(n)), color: n.color }))

  return (
    <Container x={x} y={y}>
      {rects.map(r => (
        <RoundedRectangle {...r} fill={r.color} radius={2} />
      ))}
    </Container>
  )
}
