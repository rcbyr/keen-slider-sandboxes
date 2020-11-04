import { Component, ElementRef, ViewChild } from "@angular/core"
import KeenSlider from "keen-slider"

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

  currentSlide: number = 1
  dotHelper: Array<Number> = []
  slider: KeenSlider = null

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        slideChanged: (s) => {
          this.currentSlide = s.details().relativeSlide
        },
      })
      this.dotHelper = [...Array(this.slider.details().size).keys()]
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
