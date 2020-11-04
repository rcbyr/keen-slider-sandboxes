import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./styles.css"

const images = [
  "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590004987778-bece5c9adab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
]

export default (props) => {
  const [details, setDetails] = React.useState(null)

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: images.length,
    move(s) {
      setDetails(s.details())
    },
    initial: 2,
  })

  function positionStyle(idx) {
    if (!details) return {}
    const position = details.positions[idx]
    const x = details.widthOrHeight * position.distance
    const scale_size = 0.7
    const scale = 1 - (scale_size - scale_size * position.portion)
    return {
      transform: `translate3d(${x}px, 0px, 0px) scale(${scale})`,
      WebkitTransform: `translate3d(${x}px, 0px, 0px) scale(${scale})`,
    }
  }

  return (
    <div ref={sliderRef} className="keen-slider zoom-out">
      {images.map((src, idx) => (
        <div
          key={idx}
          style={positionStyle(idx)}
          className="keen-slider__slide zoom-out__slide"
        >
          <img src={src} />
        </div>
      ))}
    </div>
  )
}
