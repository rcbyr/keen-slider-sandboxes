import * as React from "react"
import "keen-slider/keen-slider.min.css"
import "./styles.css"
import { useKeenSlider } from "keen-slider/react"
import names from "./names"
names.length = 500

export default function App() {
  const slidesPerView = 1
  const numberSlides = slidesPerView + 1
  const [slidesDetails, setSlidesDetails] = React.useState<any>(null)
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: {
      min: 0,
      max: names.length - 1,
    },
    range: {
      align: true,
      min: 0,
      max: names.length - 1,
    },
    mode: "free-snap",
    detailsChanged: (s) => {
      setSlidesDetails(s.track.details.slides)
    },
    slides: {
      number: numberSlides,
      perView: slidesPerView,
    },
  })

  return (
    <div className="keen-slider" ref={sliderRef}>
      {[...Array(numberSlides).keys()].map((idx) => {
        return (
          <div key={idx} className="keen-slider__slide">
            <div>
              {slidesDetails
                ? `${slidesDetails[idx].abs + 1}. ${
                    names[slidesDetails[idx].abs]
                  }`
                : ""}
            </div>
          </div>
        )
      })}
    </div>
  )
}
