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
  @ViewChild("sliderRef1") sliderRef1: ElementRef<HTMLElement>
  @ViewChild("sliderRef2") sliderRef2: ElementRef<HTMLElement>
  @ViewChild("sliderRef3") sliderRef3: ElementRef<HTMLElement>

  slider1: any = null
  slider2: any = null
  slider3: any = null

  ngAfterViewInit() {
    this.slider1 = new KeenSlider(this.sliderRef1.nativeElement, {
      slides: {
        origin: "center",
      },
      selector: ".first > .keen-slider__slide",
    })
    this.slider2 = new KeenSlider(this.sliderRef2.nativeElement, {
      rubberband: false,
      slides: {
        perView: 1.3,
      },
    })
    this.slider3 = new KeenSlider(this.sliderRef3.nativeElement, {
      rubberband: false,
      slides: {
        perView: 1.3,
      },
      vertical: true,
    })
  }

  ngOnDestroy() {
    if (this.slider1) this.slider1.destroy()
    if (this.slider2) this.slider2.destroy()
    if (this.slider3) this.slider3.destroy()
  }
}
