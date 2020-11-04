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

  slider: any = null

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      spacing: 10,
      slidesPerView: 1,
      centered: true,
      loop: true,
      mode: "snap",
      breakpoints: {
        "(min-width: 768px)": {
          slidesPerView: 2,
          mode: "free-snap",
        },
        "(min-width: 1200px)": {
          slidesPerView: 3,
          mode: "free-snap",
        },
      },
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
