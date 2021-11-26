import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./styles.css"

export default () => {
  const [sliderRef] = useKeenSlider({
    loop: false,
    mode: "snap",
    rtl: false,
    slides: { perView: "auto" },
  })

  return (
    <div ref={sliderRef} className="keen-slider" style={{ maxWidth: 600 }}>
      <div
        className="keen-slider__slide number-slide1"
        style={{ maxWidth: 150, minWidth: 150 }}
      >
        1
      </div>
      <div
        className="keen-slider__slide number-slide2"
        style={{ maxWidth: 100, minWidth: 100 }}
      >
        2
      </div>
      <div
        className="keen-slider__slide number-slide3"
        style={{ maxWidth: 200, minWidth: 200 }}
      >
        3
      </div>
      <div
        className="keen-slider__slide number-slide4"
        style={{ maxWidth: 500, minWidth: 500 }}
      >
        4
      </div>
      <div
        className="keen-slider__slide number-slide5"
        style={{ maxWidth: 150, minWidth: 150 }}
      >
        5
      </div>
      <div
        className="keen-slider__slide number-slide6"
        style={{ maxWidth: 75, minWidth: 75 }}
      >
        6
      </div>
    </div>
  )
}
