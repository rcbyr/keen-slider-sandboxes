import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./styles.css"

export default () => {
  const [sliderRef] = useKeenSlider({
    slides: {
      origin: "center",
    },
  })

  return (
    <div ref={sliderRef} className="keen-slider">
      <div className="keen-slider__slide number-slide1">1</div>
      <div
        className="keen-slider__slide number-slide2"
        data-keen-slider-scrollable
        style={{ overflowX: "scroll" }}
      >
        <div style={{ minWidth: "150%", textAlign: "center" }}>.... 2 ....</div>
      </div>
      <div
        className="keen-slider__slide number-slide3"
        style={{
          alignItems: "normal",
          overflowY: "scroll",
          textAlign: "center",
        }}
      >
        .
        <br />.
        <br />3
        <br />.
        <br />.
      </div>
    </div>
  )
}
