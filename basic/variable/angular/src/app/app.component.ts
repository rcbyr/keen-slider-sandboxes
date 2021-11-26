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
    this.slider = new KeenSlider<{}>(this.sliderRef.nativeElement, {
      mode: "free-snap",
      slides: () => [
        {
          size: 0.1,
          spacing: 0.1,
        },
        {
          size: 0.2,
          spacing: 0.2,
        },
        {
          size: 0.4,
          spacing: 0.3,
        },
        {
          size: 0.6,
          spacing: 1,
          origin: 0.2,
        },
        {
          size: 1,
          spacing: 0.5,
        },

        {
          size: 0.4,
          origin: 0.6,
        },
      ],
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
