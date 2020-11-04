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
  interval: any = 0
  pause: boolean = false
  slider: KeenSlider = null

  resetInterval() {
    clearInterval(this.interval)
  }
  setInterval() {
    this.resetInterval()
    this.interval = setInterval(() => {
      if (!this.pause) {
        this.slider.next()
      }
    }, 2000)
  }

  setPause(active) {
    this.pause = active
    this.setInterval()
  }

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      loop: true,
      duration: 1000,
      dragStart: () => {
        this.setPause(true)
      },
      dragEnd: () => {
        this.setPause(false)
      },
    })
    this.setInterval()
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
