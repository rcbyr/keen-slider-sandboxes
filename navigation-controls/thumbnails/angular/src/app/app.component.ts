import { Component, ElementRef, ViewChild } from "@angular/core"
import KeenSlider, { KeenSliderInstance, KeenSliderPlugin } from "keen-slider"

function ThumbnailPlugin(main: KeenSliderInstance): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          main.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      addActive(slider.track.details.rel)
      addClickEvents()
      main.on("animationStarted", (main) => {
        removeActive()
        const next = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}

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
  @ViewChild("thumbnailRef") thumbnailRef: ElementRef<HTMLElement>

  slider: KeenSliderInstance = null
  thumbnailSlider: KeenSliderInstance = null

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement)
    this.thumbnailSlider = new KeenSlider(
      this.thumbnailRef.nativeElement,
      {
        initial: 0,
        slides: {
          perView: 4,
          spacing: 10,
        },
      },
      [ThumbnailPlugin(this.slider)]
    )
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
    if (this.thumbnailSlider) this.thumbnailSlider.destroy()
  }
}
