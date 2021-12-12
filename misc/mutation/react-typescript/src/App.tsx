import React, { useState } from "react"
import "./styles.css"
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

const MutationPlugin: KeenSliderPlugin = (slider) => {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      slider.update()
    })
  })
  const config = { childList: true }

  slider.on("created", () => {
    observer.observe(slider.container, config)
  })
  slider.on("destroyed", () => {
    observer.disconnect()
  })
}

export default function App() {
  const [slides, setSlides] = useState([1])
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 3,
      },
    },
    [MutationPlugin]
  )

  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {slides.map((slide) => {
          return (
            <div
              key={slide}
              className={"keen-slider__slide number-slide" + ((slide % 5) + 1)}
            >
              {slide}
            </div>
          )
        })}
      </div>
      <div className="buttons">
        <button onClick={() => setSlides([...slides, slides.length + 1])}>
          Add
        </button>
        <button onClick={() => setSlides(slides.slice(0, -1))}>Remove</button>
      </div>
    </>
  )
}
