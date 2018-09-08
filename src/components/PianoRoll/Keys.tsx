import React, { SFC } from "react"
import _ from "lodash"
import { Rectangle, Line, Bounds } from "./PixiComponents"

// 0: white, 1: black
const colors = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0]

const isBlackKey = (index: number) => colors[index % colors.length] !== 0

const keyLayoutForNoteNumber = (
  noteNumber: number,
  keyWidth: number,
  keyHeight: number
) => {
  const isBlack = isBlackKey(noteNumber)
  const bounds: Bounds = {
    x: 0,
    y: noteNumber * keyHeight,
    width: keyWidth,
    height: keyHeight
  }
  return {
    isBlack,
    ...bounds
  }
}

const WhiteKey: SFC<Bounds> = ({ x, y, width, height }) => {
  const right = x + width
  const bottom = y + height
  return (
    <>
      <Rectangle x={x} y={y} width={width} height={height} fill={0xffffff} />
      <Line x1={x} y1={y} x2={right} y2={y} color={0x000000} />
      <Line x1={x} y1={bottom} x2={right} y2={bottom} color={0x000000} />
    </>
  )
}

const BlackKey: SFC<Bounds> = bounds => {
  return <Rectangle {...bounds} fill={0x000000} />
}

export interface KeysProps {
  keyHeight: number
  width: number
  numberOfKeys: number
}

export const Keys: SFC<KeysProps> = ({ keyHeight, width, numberOfKeys }) => {
  const layouts = _.range(0, numberOfKeys).map(i =>
    keyLayoutForNoteNumber(i, width, keyHeight)
  )

  return (
    <>
      {layouts.filter(l => !l.isBlack).map((l, i) => {
        return <WhiteKey key={i} {...l} />
      })}
      {layouts.filter(l => l.isBlack).map((l, i) => {
        return <BlackKey key={i} {...l} />
      })}
    </>
  )
}
