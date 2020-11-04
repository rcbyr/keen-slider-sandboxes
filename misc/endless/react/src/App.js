import React from "react"
import { useKeenSlider } from "keen-slider/react"
import randomColor from "randomcolor"
import "keen-slider/keen-slider.min.css"
import "./styles.css"

export default function Wheel(props) {
  const [sliderState, setSliderState] = React.useState(null)
  const [sliderRef] = useKeenSlider({
    initial: 0,
    loop: true,
    mode: "free-snap",
    move: (s) => {
      setSliderState(s.details())
    },
  })

  function slideValues() {
    if (!sliderState) return [0, 1]

    const values = []
    for (let i = 0; i < 2; i++) {
      const distance = sliderState ? sliderState.positions[i].distance : 0
      const value = sliderState.absoluteSlide + Math.round(distance)
      values.push(value)
    }
    return values
  }

  return (
    <div className="keen-slider" ref={sliderRef}>
      {slideValues().map((value, key) => {
        return (
          <div
            key={key}
            className="keen-slider__slide endless-slide"
            style={{
              backgroundColor: randomColor({
                seed: Math.abs(value),
                luminosity: "light",
              }),
            }}
          >
            {value}
          </div>
        )
      })}
    </div>
  )
}
