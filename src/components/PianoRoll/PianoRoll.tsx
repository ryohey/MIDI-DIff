import React from "react"
import { Stage } from "@inlet/react-pixi"
import { Keys } from "./Keys"
import { Grid } from "./Grid"

const numberOfKeys = 127
const keyHeight = 16
const keyWidth = 50
const stageWidth = 500

export const PianoRoll = () => {
  return (
    <Stage
      width={stageWidth}
      height={500}
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
    </Stage>
  )
}
