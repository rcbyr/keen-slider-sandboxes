import React, { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./styles.css"

export default () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, propsRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          <div className="keen-slider__slide number-slide1">1</div>
          <div className="keen-slider__slide number-slide2">2</div>
          <div className="keen-slider__slide number-slide3">3</div>
          <div className="keen-slider__slide number-slide4">4</div>
          <div className="keen-slider__slide number-slide5">5</div>
          <div className="keen-slider__slide number-slide6">6</div>
        </div>
        {loaded && propsRef.current && (
          <>
            <Arrow
              left
              onClick={(e) => e.stopPropagation() || propsRef.current?.prev()}
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) => e.stopPropagation() || propsRef.current?.next()}
              disabled={
                currentSlide ===
                propsRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>
      {loaded && propsRef.current && (
        <div className="dots">
          {[...Array(propsRef.current.track.details.slides.length).keys()].map(
            (idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    propsRef.current?.moveToIdx(idx)
                  }}
                  className={"dot" + (currentSlide === idx ? " active" : "")}
                ></button>
              )
            }
          )}
        </div>
      )}
    </>
  )
}

function Arrow(props) {
  const disabeld = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}
