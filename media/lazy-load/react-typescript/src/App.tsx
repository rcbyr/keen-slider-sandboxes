import * as React from "react"
import "./styles.css"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

const images = [
  "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590004987778-bece5c9adab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
  "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
]

export default function App() {
  const [loaded, setLoaded] = React.useState<boolean[]>([])
  const [currentSlide, setCurrentSlide] = React.useState(0)

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    animationEnded(s) {
      setCurrentSlide(s.track.details.rel)
    },
    loop: true,
    initial: 0,
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
