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
  rotation: number = 0
  slider: any = null

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        slides: 2,
        move: (s) => {
          const progress = s.details().progressTrack
          const delta = -progress
          this.rotation = delta * 360
        },
        loop: true,
      })
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
