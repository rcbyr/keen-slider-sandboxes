import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./styles.css"

export default () => {
  const [pause, setPause] = React.useState(false)
  const timer = React.useRef()
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    created(s) {
      s.container.addEventListener("mouseover", () => {
        setPause(true)
      })
      s.container.addEventListener("mouseout", () => {
        setPause(false)
      })
    },
    dragStarted: () => {
      setPause(true)
    },
    dragEnded: () => {
      setPause(false)
    },
  })

  React.useEffect(() => {
    timer.current = setInterval(() => {
      if (!pause && slider && !document.hidden) {
        slider.current?.next()
      }
    }, 2000)
    return () => {
      clearInterval(timer.current)
    }
  }, [pause, slider])

  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        <div className="keen-slider__slide number-slide1">1</div>
        <div className="keen-slider__slide number-slide2">2</div>
        <div className="keen-slider__slide number-slide3">3</div>
        <div className="keen-slider__slide number-slide4">4</div>
        <div className="keen-slider__slide number-slide5">5</div>
        <div className="keen-slider__slide number-slide6">6</div>
      </div>
    </>
  )
}
