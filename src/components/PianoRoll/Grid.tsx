import React, { SFC } from "react"
import { Line } from "./PixiComponents"
import _ from "lodash"

export interface GridProps {
  numberOfKeys: number
  keyHeight: number
  width: number
}

export const Grid: SFC<GridProps> = ({ numberOfKeys, keyHeight, width }) => {
  return (
    <>
      {_.range(0, numberOfKeys).map(i => {
        const y = i * keyHeight
        return <Line key={i} x1={0} y1={y} x2={width} y2={y} color={0xd3d7e2} />
      })}
    </>
  )
}
