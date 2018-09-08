import React from "react"
import { Stage } from "@inlet/react-pixi"
import { Keys } from "./Keys"
import { Grid } from "./Grid"

const numberOfKeys = 127
const keyHeight = 20
const keyWidth = 60
const stageWidth = 500

export const PianoRoll = () => {
  return (
    <Stage
      width={stageWidth}
      height={500}
      options={{ antialias: true, backgroundColor: 0xeeeeee }}
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
