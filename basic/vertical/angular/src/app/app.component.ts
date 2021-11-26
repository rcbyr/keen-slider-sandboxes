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
      loop: true,
      slides: {
        origin: "center",
        perView: 2,
        spacing: 10,
      },
      vertical: true,
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
