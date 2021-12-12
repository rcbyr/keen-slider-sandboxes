import React, { useState } from "react"
import "./styles.css"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

export default function App() {
  const [scrolling, setScrolling] = useState(true)
  const smallHeight = React.useRef(0)
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 2,
    vertical: true,
    rubberband: true,
    slides: (size, elements) => {
      smallHeight.current = elements[0].getBoundingClientRect().height
      const mediumHeight = elements[1].getBoundingClientRect().height

      size -= smallHeight.current
      console.log(size, smallHeight.current, elements)

      return [
        { size: smallHeight.current / size, origin: 0 },
        { size: mediumHeight / size, origin: 0 },
        {
          size: (size - smallHeight.current - mediumHeight) / size,
          origin: -(size - smallHeight.current - mediumHeight) / size,
        },
      ]
    },
    detailsChanged(slider) {
      const y =
        (slider.size - smallHeight.current) *
        slider.track.details.length *
        slider.track.details.progress *
        -1
      slider.container.style.transform = `translate3d(0, ${Math.round(y)}px, 0)`
    },
    renderMode: "custom",
    slideChanged(slider) {
      setScrolling(slider.track.details.rel === 2)
      // desktop fix
      slider.container.querySelector(".card__inner__scrolling")?.scrollTo(0, 0)
    },
  })

  return (
    <div className="card">
      <div className="card__inner keen-slider" ref={sliderRef}>
        <div
          className="card__inner__scrolling"
          data-keen-slider-scrollable
          style={{
            height: "100%",
            overflowY: scrolling ? "scroll" : "visible",
          }}
        >
          <div className="indicatorWrapper">
            <div className="indicator"></div>
          </div>
          <div className="keen-slider__slide small">
            <div className="title">Some Title</div>
            <div className="subtitle">Subtitle</div>
          </div>
          <div className="keen-slider__slide medium">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
          </div>
          <div className="keen-slider__slide large">
            <br />
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet Lorem ipsum
            dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
            dolor sit amet. Lorem ipsum dolor sit amet tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
            no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
            dolor sit amet
          </div>
        </div>
      </div>
    </div>
  )
}
