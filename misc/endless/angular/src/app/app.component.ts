import { Component, ElementRef, ViewChild } from "@angular/core"
import KeenSlider, { TDetails } from "keen-slider"
import * as randomColor from "randomcolor"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: [
    "../../node_modules/keen-slider/keen-slider.min.css",

    "./app.component.css",
  ],
})
export class AppComponent {
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement>
  details: TDetails = undefined
  slider: any = null
  slides: number[] = [0, 1]
  values: number[] = [0, 1]

  getStyle(value) {
    return {
      "background-color": randomColor({
        seed: Math.abs(value),
        luminosity: "light",
      }),
    }
  }

  slideValues(details) {
    const values = []
    for (let i = 0; i < 2; i++) {
      const distance = details.positions[i].distance
      const value = details.absoluteSlide + Math.round(distance)
      values.push(value)
    }
    this.values = values
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: 0,
        loop: true,
        mode: "free-snap",
        move: (s) => {
          this.slideValues(s.details())
        },
      })
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
