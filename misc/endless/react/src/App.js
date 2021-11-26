import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./styles.css"
import randomColor from "randomcolor"

export default () => {
  const numberSlides = 4
  const [slidesDetails, setSlidesDetails] = React.useState(null)
  const [sliderRef] = useKeenSlider({
    initial: 0,
    loop: true,

    mode: "free-snap",
    detailsChanged: (s) => {
      setSlidesDetails(s.track.details.slides)
    },
    slides: {
      number: numberSlides,
      perView: 3,
    },
  })

  return (
    <>
      <div className="keen-slider" ref={sliderRef}>
        {[...Array(numberSlides).keys()].map((idx) => {
          return (
            <div
              key={idx}
              className="keen-slider__slide endlessSlide"
              style={{
                backgroundColor: randomColor({
                  seed: Math.abs(slidesDetails ? slidesDetails[idx].abs : idx),
                  luminosity: "light",
                }),
              }}
            >
              {slidesDetails ? slidesDetails[idx].abs : idx}
            </div>
          )
        })}
      </div>
    </>
  )
}
