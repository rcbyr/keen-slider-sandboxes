import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./styles.css"

export default () => {
  const [sliderRef] = useKeenSlider({
    mode: "free-snap",
    slides: () => [
      {
        size: 0.1,
        spacing: 0.1,
      },
      {
        size: 0.2,
        spacing: 0.2,
      },
      {
        size: 0.4,
        spacing: 0.3,
      },
      {
        size: 0.6,
        spacing: 1,
        origin: 0.2,
      },
      {
        size: 1,
        spacing: 0.5,
      },

      {
        size: 0.4,
        origin: 0.6,
      },
    ],
  })

  return (
    <div ref={sliderRef} className="keen-slider">
      <div className="keen-slider__slide number-slide1">1</div>
      <div className="keen-slider__slide number-slide2">2</div>
      <div className="keen-slider__slide number-slide3">3</div>
      <div className="keen-slider__slide number-slide4">4</div>
      <div className="keen-slider__slide number-slide5">5</div>
      <div className="keen-slider__slide number-slide6">6</div>
    </div>
  )
}
