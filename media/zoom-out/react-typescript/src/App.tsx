import * as React from "react"
import "./styles.css"
import { useKeenSlider, TrackDetails } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

export default function App() {
  const [details, setDetails] = React.useState<TrackDetails | null>(null)
  const [size, setSize] = React.useState<number>(0)

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    selector: null,
    slides: images.length,
    detailsChanged(s) {
      setSize(s.size)
      setDetails(s.track.details)
    },
    initial: 2,
  })

  function positionStyle(idx: number) {
    if (!details) return {}
    const position = details.slides[idx]
    const x = size * position.distance
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
