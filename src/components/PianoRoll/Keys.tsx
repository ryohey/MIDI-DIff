import React, { SFC } from "react"
import _ from "lodash"
import {
  Rectangle,
  Bounds,
  RoundedRectangle,
  RoundedRectangleProps
} from "./PixiComponents"

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

/* 右側だけが角丸の矩形 */
const RightRoundedRectangle: SFC<RoundedRectangleProps> = ({
  x,
  y,
  width,
  height,
  radius,
  fill
}) => {
  return (
    <>
      <Rectangle x={x} y={y} width={width / 2} height={height} fill={fill} />
      <RoundedRectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        radius={radius}
      />
    </>
  )
}

const WhiteKey: SFC<Bounds> = ({ x, y, width, height }) => {
  const margin = 1
  const shadowWidth = 3
  return (
    <>
      <RoundedRectangle
        x={x}
        y={y + margin}
        width={width - margin}
        height={height - margin}
        fill={0xe4e8f3}
        radius={height / 10}
      />
      <RightRoundedRectangle
        x={x}
        y={y + margin}
        width={width - margin - shadowWidth}
        height={height - margin}
        fill={0xffffff}
        radius={height / 10}
      />
    </>
  )
}

const BlackKey: SFC<Bounds> = bounds => {
  const highlightWidth = bounds.width / 10
  const highlightMargin = 1
  return (
    <>
      <RoundedRectangle
        {...bounds}
        fill={0x21366a}
        radius={bounds.height / 8}
      />
      <RoundedRectangle
        x={bounds.x + bounds.width - highlightWidth - highlightMargin}
        y={bounds.y + highlightMargin}
        width={highlightWidth}
        height={bounds.height - highlightMargin * 2}
        fill={0x455d96}
        radius={bounds.height / 8}
      />
    </>
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
        fill={0x515a7c}
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
