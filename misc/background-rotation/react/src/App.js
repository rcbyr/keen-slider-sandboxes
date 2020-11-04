import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./styles.css"

export default function Header() {
  const [rotation, setRotation] = React.useState()

  const [sliderRef] = useKeenSlider({
    slides: 2,
    move(s) {
      const progress = s.details().progressTrack
      const delta = -progress
      setRotation(delta * 360)
    },
    loop: true,
  })

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(${rotation}deg, black 0px, black 50%, white 50%, white 100%)`,
      }}
      className="background-rotation"
      ref={sliderRef}
    >
      <div
        className="background-rotation__inner"
        style={{
          backgroundImage: `linear-gradient(${rotation}deg, white 0px, white 50%, black 50%, black 100%)`,
        }}
      >
        <span>keen-slider</span>
      </div>
    </div>
  )
}
