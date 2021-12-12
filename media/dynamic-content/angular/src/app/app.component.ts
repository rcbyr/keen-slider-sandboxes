import { Component, ElementRef, ViewChild } from "@angular/core"
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import names from "./names"
names.length = 500

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
  names: String[] = names
  indexes: number[] = []
  slider: KeenSliderInstance = null

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: 0,
        loop: {
          min: 0,
          max: names.length - 1,
        },
        range: {
          align: true,
          min: 0,
          max: names.length - 1,
        },
        mode: "free-snap",
        detailsChanged: (s) => {
          this.indexes = s.track.details.slides.map((slide) => {
            return slide.abs
          })
        },
        slides: {
          number: 2,
          perView: 1,
        },
      })
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
