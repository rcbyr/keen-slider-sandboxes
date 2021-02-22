import { Component, ElementRef, ViewChild, Input } from "@angular/core"
import KeenSlider from "keen-slider"

@Component({
  selector: "wheel",
  templateUrl: "./wheel.component.html",
  styleUrls: [
    "../../node_modules/keen-slider/keen-slider.min.css",
    "./wheel.component.css",
  ],
})
export class WheelComponent {
  @Input() loop: boolean
  @Input() initIdx: number = 0
  @Input() length: number
  @Input() width: number
  @Input() perspective: string = "center"
  @Input() setValue: Function | undefined
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>

  slidesPerView: number = 1
  slideDegree: number = 360 / 20
  slider: KeenSlider = null
  slideValues: string[] = []
  radius: number = 0
  wheelSize: number = 20
  setSlideValues(details) {
    const offset = this.loop ? 1 / 2 - 1 / this.slidesPerView / 2 : 0

    const values = []
    for (let i = 0; i < this.length; i++) {
      const distance =
        (details.positions[i].distance - offset) * this.slidesPerView
      const rotate =
        Math.abs(distance) > this.wheelSize / 2
          ? 180
          : distance * (360 / this.wheelSize) * -1
      const style = {
        transform: `rotateX(${rotate}deg) translateZ(${this.radius}px)`,
        WebkitTransform: `rotateX(${rotate}deg) translateZ(${this.radius}px)`,
      }
      const value = this.setValue
        ? this.setValue(i, details.absoluteSlide + Math.round(distance))
        : i
      values.push({ style, value })
    }
    this.slideValues = values
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.loop) this.slidesPerView = 9
      const options = {
        centered: this.loop,
        vertical: true,

        initial: this.initIdx || 0,
        loop: this.loop,
        dragSpeed: (val, instance) => {
          const height = instance.details().widthOrHeight
          return (
            val *
            (height /
              ((height / 2) * Math.tan(this.slideDegree * (Math.PI / 180))) /
              this.slidesPerView)
          )
        },
        move: (s) => {
          this.setSlideValues(s.details())
        },
        rubberband: !this.loop,
        mode: "free-snap",
        slides: this.length,
        slidesPerView: this.slidesPerView,
      }

      this.slider = new KeenSlider(this.sliderRef.nativeElement, options)
      this.radius = this.slider.details().widthOrHeight / 2
      this.setSlideValues(this.slider.details())
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
