import React from "react"
import { SFC } from "react"
import { NoteEvent } from "../../midi/AbsoluteMidiEvent"
import { Container } from "@inlet/react-pixi"
import {
  NoteCoordTransform,
  convertRect
} from "../../transform/NoteCoordTransform"
import { RoundedRectangle } from "./PixiComponents"

export interface NotesProps {
  x?: number
  y?: number
  notes: NoteEvent[]
  transform: NoteCoordTransform
}

export const Notes: SFC<NotesProps> = ({ x = 0, y = 0, notes, transform }) => {
  const toRect = convertRect(transform)
  const rects = notes.map(toRect)

  return (
    <Container x={x} y={y}>
      {rects.map(r => (
        <RoundedRectangle {...r} fill={0x0000ff} radius={4} />
      ))}
    </Container>
  )
}
