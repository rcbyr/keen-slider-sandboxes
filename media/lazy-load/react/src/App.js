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
  const [loaded, setLoaded] = React.useState([])
  const [currentSlide, setCurrentSlide] = React.useState(0)

  const [sliderRef] = useKeenSlider({
    afterChange(s) {
      setCurrentSlide(s.details().relativeSlide)
    },
    loop: true,
    initial: 1,
  })

  React.useEffect(() => {
    const new_loaded = [...loaded]
    new_loaded[currentSlide] = true
    setLoaded(new_loaded)
  }, [currentSlide])

  return (
    <div ref={sliderRef} className="keen-slider">
      {images.map((src, idx) => (
        <div key={idx} className="keen-slider__slide lazy__slide">
          <img src={loaded[idx] ? src : ""} />
        </div>
      ))}
    </div>
  )
}
