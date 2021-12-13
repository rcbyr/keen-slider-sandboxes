import { Component, ElementRef, ViewChild } from "@angular/core"
import KeenSlider, { KeenSliderInstance } from "keen-slider"

const animation = { duration: 5000, easing: (t) => t }

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

  slider: KeenSliderInstance = null

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      loop: true,
      renderMode: "performance",
      drag: false,
      created(s) {
        s.moveToIdx(5, true, animation)
      },
      updated(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation)
      },
      animationEnded(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation)
      },
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
