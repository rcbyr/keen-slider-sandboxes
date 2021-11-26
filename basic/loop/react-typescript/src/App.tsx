import * as React from "react"
import "./styles.css"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

export default function App() {
  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
  })
  return (
    <div ref={ref} className="keen-slider">
      <div className="keen-slider__slide number-slide1">1</div>
      <div className="keen-slider__slide number-slide2">2</div>
      <div className="keen-slider__slide number-slide3">3</div>
      <div className="keen-slider__slide number-slide4">4</div>
      <div className="keen-slider__slide number-slide5">5</div>
      <div className="keen-slider__slide number-slide6">6</div>
    </div>
  )
}
