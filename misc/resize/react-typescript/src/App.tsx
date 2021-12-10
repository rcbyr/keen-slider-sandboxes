import React, { useState } from "react"
import "./styles.css"
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

const ResizePlugin: KeenSliderPlugin = (slider) => {
  const observer = new ResizeObserver(function () {
    slider.update()
  })

  slider.on("created", () => {
    observer.observe(slider.container)
  })
  slider.on("destroyed", () => {
    observer.unobserve(slider.container)
  })
}

export default function App() {
  const [small, setSmall] = useState(false)
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 3,
      },
    },
    [ResizePlugin]
  )

  return (
    <>
      <div className="wrapper">
        <div
          ref={sliderRef}
          className="keen-slider"
          style={{
            width: `${small ? 50 : 100}%`,
          }}
        >
          <div className="keen-slider__slide number-slide1">1</div>
          <div className="keen-slider__slide number-slide2">2</div>
          <div className="keen-slider__slide number-slide3">3</div>
          <div className="keen-slider__slide number-slide4">4</div>
          <div className="keen-slider__slide number-slide5">5</div>
          <div className="keen-slider__slide number-slide6">6</div>
        </div>
      </div>
      <div className="buttons">
        <button onClick={() => setSmall(!small)}>Toggle Width</button>
      </div>
    </>
  )
}
