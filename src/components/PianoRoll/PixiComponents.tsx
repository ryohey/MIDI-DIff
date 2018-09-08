import * as PIXI from "pixi.js"
import { PixiComponent } from "@inlet/react-pixi"

export interface Bounds {
  x: number
  y: number
  width: number
  height: number
}

export type RectangleProps = Bounds & {
  fill: number
  debugDraw?: boolean
}

export const Rectangle = PixiComponent<RectangleProps, PIXI.Graphics>(
  "Rectangle",
  {
    create: () => new PIXI.Graphics(),
    applyProps: (g, _, props) => {
      const { fill, x, y, width, height, debugDraw = false } = props

      g.clear()
      g.beginFill(fill)
      g.drawRect(x, y, width, height)
      g.endFill()

      if (debugDraw) {
        g.lineStyle(1, 0x00ffff, 0.5, 0)
        g.moveTo(x, y)
        g.lineTo(x + width, y + height)
      }
    }
  }
)

export interface LineProps {
  x1: number
  y1: number
  x2: number
  y2: number
  lineWidth?: number
  color?: number
  alpha?: number
  alignment?: number
}

export const Line = PixiComponent<LineProps, PIXI.Graphics>("Line", {
  create: () => new PIXI.Graphics(),
  applyProps: (g, _, props) => {
    const {
      x1,
      y1,
      x2,
      y2,
      lineWidth = 1,
      color = 0,
      alpha = 1,
      alignment = 0
    } = props

    g.clear()
    g.lineStyle(lineWidth, color, alpha, alignment)
    g.moveTo(x1, y1)
    g.lineTo(x2, y2)
  }
})

export interface CircleProps {
  fill: any
  x: number
  y: number
  radius: number
}

export const Circle = PixiComponent<CircleProps, PIXI.Graphics>("Circle", {
  create: () => new PIXI.Graphics(),
  applyProps: (g, _, props) => {
    const { fill, x, y, radius } = props

    g.clear()
    g.beginFill(fill)
    g.drawCircle(x, y, radius)
    g.endFill()
  }
})

export type RoundedRectangleProps = Bounds & {
  fill: number
  radius: number
}

export const RoundedRectangle = PixiComponent<
  RoundedRectangleProps,
  PIXI.Graphics
>("RoundedRectangle", {
  create: () => new PIXI.Graphics(),
  applyProps: (g, _, props) => {
    const { fill, x, y, width, height, radius } = props

    g.clear()
    g.beginFill(fill)
    g.drawRoundedRect(x, y, width, height, radius)
    g.endFill()
  }
})
