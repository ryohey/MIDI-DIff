import React, { SFC } from "react"
import _ from "lodash"
import { Rectangle, Line, Bounds, RoundedRectangle } from "./PixiComponents"

// 0: white, 1: black
const colors = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0]

const isBlackKey = (index: number) => colors[index % colors.length] !== 0

const keyLayoutForNoteNumber = (
  noteNumber: number,
  keyWidth: number,
  keyHeight: number
) => {
  const isBlack = isBlackKey(noteNumber)
  const baseY = noteNumber * keyHeight
  if (isBlack) {
    const height = keyHeight * 0.8
    return {
      isBlack,
      x: 0,
      y: baseY + (keyHeight - height) / 2,
      width: keyWidth * 0.6,
      height
    }
  }

  const index = noteNumber % 12
  const y = index === 0 || index === 5 ? baseY : baseY - keyHeight / 2
  const height =
    index === 0 || index === 4 || index === 5 || index === 11
      ? keyHeight * 1.5
      : keyHeight * 2

  return {
    isBlack,
    x: 0,
    y,
    width: keyWidth,
    height
  }
}

const WhiteKey: SFC<Bounds> = ({ x, y, width, height }) => {
  const right = x + width
  const bottom = y + height
  return (
    <>
      {/*左側は角丸にしない*/}
      <Rectangle
        x={x}
        y={y}
        width={width / 2}
        height={height}
        fill={0xffffff}
      />
      <RoundedRectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={0xffffff}
        radius={height / 8}
      />
      <Line x1={x} y1={y} x2={right} y2={y} color={0x000000} />
      <Line x1={x} y1={bottom} x2={right} y2={bottom} color={0x000000} />
    </>
  )
}

const BlackKey: SFC<Bounds> = bounds => {
  return (
    <RoundedRectangle {...bounds} fill={0x000000} radius={bounds.height / 8} />
  )
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
      <Rectangle
        x={0}
        y={0}
        width={width}
        height={numberOfKeys * keyHeight}
        fill={0x222222}
      />
      {layouts.filter(l => !l.isBlack).map((l, i) => {
        return <WhiteKey key={i} {...l} />
      })}
      {layouts.filter(l => l.isBlack).map((l, i) => {
        return <BlackKey key={i} {...l} />
      })}
    </>
  )
}
