import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./Wheel.css"

export default function Wheel(props) {
  const perspective = props.perspective || "center"
  const wheelSize = 20
  const slides = props.length
  const slideDegree = 360 / wheelSize
  const slidesPerView = props.loop ? 9 : 1
  const [sliderState, setSliderState] = React.useState(null)
  const [sliderRef, slider] = useKeenSlider({
    centered: props.loop,
    vertical: true,
    friction: 0.0025,
    initial: props.initIdx || 0,
    loop: props.loop,
    dragSpeed: (val, instance) => {
      const height = instance.details().widthOrHeight
      return (
        val *
        (height /
          ((height / 2) * Math.tan(slideDegree * (Math.PI / 180))) /
          slidesPerView)
      )
    },
    move: (s) => {
      setSliderState(s.details())
    },
    rubberband: !props.loop,
    mode: "free-snap",
    slides,
    slidesPerView,
  })

  const [radius, setRadius] = React.useState(0)

  React.useEffect(() => {
    if (slider) setRadius(slider.details().widthOrHeight / 2)
  }, [slider])

  function slideValues() {
    if (!sliderState) return []
    const offset = props.loop ? 1 / 2 - 1 / slidesPerView / 2 : 0

    const values = []
    for (let i = 0; i < slides; i++) {
      const distance = sliderState
        ? (sliderState.positions[i].distance - offset) * slidesPerView
        : 0
      const rotate =
        Math.abs(distance) > wheelSize / 2
          ? 180
          : distance * (360 / wheelSize) * -1
      const style = {
        transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
        WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
      }
      const value = props.setValue
        ? props.setValue(i, sliderState.absoluteSlide + Math.round(distance))
        : i
      values.push({ style, value })
    }
    return values
  }

  return (
    <div
      className={"wheel keen-slider wheel--perspective-" + perspective}
      ref={sliderRef}
    >
      <div
        className="wheel__shadow-top"
        style={{
          transform: `translateZ(${radius}px)`,
          WebkitTransform: `translateZ(${radius}px)`,
        }}
      />
      <div className="wheel__inner">
        <div className="wheel__slides" style={{ width: props.width + "px" }}>
          {slideValues().map(({ style, value }, idx) => (
            <div className="wheel__slide" style={style} key={idx}>
              <span>{value}</span>
            </div>
          ))}
        </div>
        {props.label && (
          <div
            className="wheel__label"
            style={{
              transform: `translateZ(${radius}px)`,
              WebkitTransform: `translateZ(${radius}px)`,
            }}
          >
            {props.label}
          </div>
        )}
      </div>
      <div
        className="wheel__shadow-bottom"
        style={{
          transform: `translateZ(${radius}px)`,
          WebkitTransform: `translateZ(${radius}px)`,
        }}
      />
    </div>
  )
}
