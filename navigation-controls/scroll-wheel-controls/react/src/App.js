import React, { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./styles.css"

const WheelControls = (slider) => {
  let touchTimeout
  let position
  let wheelActive

  function dispatch(e, name) {
    position.x -= e.deltaX
    position.y -= e.deltaY
    slider.container.dispatchEvent(
      new CustomEvent(name, {
        detail: {
          x: position.x,
          y: position.y,
        },
      })
    )
  }

  function wheelStart(e) {
    position = {
      x: e.pageX,
      y: e.pageY,
    }
    dispatch(e, "ksDragStart")
  }

  function wheel(e) {
    dispatch(e, "ksDrag")
  }

  function wheelEnd(e) {
    dispatch(e, "ksDragEnd")
  }

  function eventWheel(e) {
    e.preventDefault()
    if (!wheelActive) {
      wheelStart(e)
      wheelActive = true
    }
    wheel(e)
    clearTimeout(touchTimeout)
    touchTimeout = setTimeout(() => {
      wheelActive = false
      wheelEnd(e)
    }, 50)
  }

  slider.on("created", () => {
    slider.container.addEventListener("wheel", eventWheel, {
      passive: false,
    })
  })
}

export default function App() {
  const [sliderRef] = useKeenSlider(
    {
      loop: false,
      rubberband: false,
      vertical: true,
    },
    [WheelControls]
  )

  return (
    <div ref={sliderRef} className="keen-slider" style={{ height: 200 }}>
      <div className="keen-slider__slide number-slide1">1</div>
      <div className="keen-slider__slide number-slide2">2</div>
      <div className="keen-slider__slide number-slide3">3</div>
      <div className="keen-slider__slide number-slide4">4</div>
      <div className="keen-slider__slide number-slide5">5</div>
      <div className="keen-slider__slide number-slide6">6</div>
    </div>
  )
}
