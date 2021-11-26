import { KeenSliderOptions } from "@/../keen-slider"
import React, { useRef } from "react"
import { TrackDetails, useKeenSlider } from "keen-slider/react"

export default function Wheel(props: {
  initIdx?: number
  label?: string
  length: number
  loop?: boolean
  perspective?: "left" | "right" | "center"
  setValue?: (relative: number, absolute: number) => string
  width: number
}) {
  const perspective = props.perspective || "center"
  const wheelSize = 20
  const slides = props.length
  const slideDegree = 360 / wheelSize
  const slidesPerView = props.loop ? 9 : 1
  const [sliderState, setSliderState] = React.useState<TrackDetails | null>(
    null
  )
  const size = useRef(0)
  const options = useRef<KeenSliderOptions>({
    slides: {
      number: slides,
      origin: props.loop ? "center" : "auto",
      perView: slidesPerView,
    },

    vertical: true,

    initial: props.initIdx || 0,
    loop: props.loop,
    dragSpeed: (val) => {
      const height = size.current
      return (
        val *
        (height /
          ((height / 2) * Math.tan(slideDegree * (Math.PI / 180))) /
          slidesPerView)
      )
    },
    created: (s) => {
      size.current = s.size
    },
    updated: (s) => {
      size.current = s.size
    },
    detailsChanged: (s) => {
      setSliderState(s.track.details)
    },
    rubberband: !props.loop,
    mode: "free-snap",
  })

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(options.current)

  const [radius, setRadius] = React.useState(0)

  React.useEffect(() => {
    if (slider.current) setRadius(slider.current.size / 2)
  }, [slider])

  function slideValues() {
    if (!sliderState) return []
    const offset = props.loop ? 1 / 2 - 1 / slidesPerView / 2 : 0

    const values = []
    for (let i = 0; i < slides; i++) {
      const distance = sliderState
        ? (sliderState.slides[i].distance - offset) * slidesPerView
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
        ? props.setValue(i, sliderState.abs + Math.round(distance))
        : i
      values.push({ style, value })
    }
    return values
  }

  return (
    <>
      <style jsx>{`
        .wheel.keen-slider {
          display: block;
          color: #fff;
          height: 100%;
          overflow: visible;
          width: 100%;
        }
        .wheel--perspective-right .wheel__inner {
          perspective-origin: calc(50% + 100px) 50%;
          transform: translateX(10px);
          -webkit-transform: translateX(10px);
        }
        .wheel--perspective-left .wheel__inner {
          perspective-origin: calc(50% - 100px) 50%;
          transform: translateX(-10px);
          -webkit-transform: translateX(-10px);
        }

        .wheel__inner {
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
          transform-style: preserve-3d;
          height: 16%;
          width: 100%;
        }

        .wheel__slides {
          height: 100%;
          position: relative;
          width: 100%;
        }

        .wheel__shadow-top,
        .wheel__shadow-bottom {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.9) 0%,
            rgba(0, 0, 0, 0.5) 100%
          );
          left: 0;
          height: calc(42% + 2px);
          width: 100%;
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.3);
          position: relative;
          margin-top: -2px;
          z-index: 5;
        }

        .wheel__shadow-bottom {
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.5) 0%,
            rgba(0, 0, 0, 0.9) 100%
          );
          margin-top: 2px;
          border-bottom: none;
          border-top: 0.5px solid rgba(255, 255, 255, 0.3);
        }

        .wheel__label {
          font-weight: 500;
          font-size: 15px;
          line-height: 1;
          margin-top: 1px;
          margin-left: 5px;
        }

        .wheel__slide {
          align-items: center;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          display: flex;
          font-size: 20px;
          font-weight: 400;
          height: 100%;
          width: 100%;
          position: absolute;
          justify-content: flex-end;
        }
      `}</style>
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
    </>
  )
}
