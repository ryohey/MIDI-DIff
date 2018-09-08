import React, { ReactNode } from "react"
import * as PIXI from "pixi.js"
import { Stage, withPixiApp, PixiComponent } from "@inlet/react-pixi"

interface MoverProps {
  app: PIXI.Application
  from: number
  to: number
  speed: number
  ease: Function
  children: (_: { value: number; i: number }) => ReactNode
}

const Mover = withPixiApp(
  class extends React.Component<MoverProps> {
    state = { value: 0 }
    counter = 0

    componentDidMount() {
      this.setState({ value: this.props.from })
      this.props.app.ticker.add(this.tick)
    }

    componentWillUnmount() {
      this.props.app.ticker.remove(this.tick)
    }

    tick = (delta: number) => {
      const { ease, from, to, speed } = this.props

      this.counter += speed * delta
      const value =
        from + (to - from) / 2 + (ease(this.counter) * (from - to)) / 2

      this.setState({ value })
    }

    render() {
      return this.props.children({ value: this.state.value, i: this.counter })
    }
  }
)

interface RectangleProps {
  fill: any
  x: number
  y: number
  width: number
  height: number
}

const Rectangle = PixiComponent<RectangleProps, PIXI.Graphics>("Rectangle", {
  create: () => new PIXI.Graphics(),
  applyProps: (g, _, props) => {
    const { fill, x, y, width, height } = props

    g.clear()
    g.beginFill(fill)
    g.drawRect(x, y, width, height)
    g.endFill()
  }
})

interface CircleProps {
  fill: any
  x: number
  y: number
  radius: number
}

const Circle = PixiComponent<CircleProps, PIXI.Graphics>("Circle", {
  create: () => new PIXI.Graphics(),
  applyProps: (g, _, props) => {
    const { fill, x, y, radius } = props

    g.clear()
    g.beginFill(fill)
    g.drawCircle(x, y, radius)
    g.endFill()
  }
})

const App = () => (
  <Stage
    width={500}
    height={500}
    options={{ antialias: true, backgroundColor: 0x012b30 }}
  >
    <Mover from={0} to={400} ease={Math.sin} speed={0.05}>
      {({ value, i }) => (
        <Rectangle
          x={value}
          y={value}
          width={100}
          height={100 + Math.cos(i) * 50}
          fill={0xff0000}
        />
      )}
    </Mover>
    <Mover from={30} to={40} ease={Math.cos} speed={0.1}>
      {({ value, i }) => (
        <Circle
          x={220 + value + Math.sin(i) * 10}
          y={220 + value + Math.cos(i / 2) * 50}
          radius={30 + Math.cos(i / 10) * 20}
          fill={0x00ff00}
        />
      )}
    </Mover>
  </Stage>
)

export const PianoRoll = () => {
  return <App />
}
