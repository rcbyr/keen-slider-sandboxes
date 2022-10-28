
<template>
  <div>
    <div ref="slider" class="keen-slider">
      <div class="keen-slider__slide number-slide1">1</div>
      <div class="keen-slider__slide number-slide2">2</div>
      <div class="keen-slider__slide number-slide3">3</div>
      <div class="keen-slider__slide number-slide4">4</div>
      <div class="keen-slider__slide number-slide5">5</div>
      <div class="keen-slider__slide number-slide6">6</div>
    </div>
    <div ref="thumbnail" class="keen-slider thumbnail">
      <div class="keen-slider__slide number-slide1">1</div>
      <div class="keen-slider__slide number-slide2">2</div>
      <div class="keen-slider__slide number-slide3">3</div>
      <div class="keen-slider__slide number-slide4">4</div>
      <div class="keen-slider__slide number-slide5">5</div>
      <div class="keen-slider__slide number-slide6">6</div>
    </div>
  </div>
</template>

<script>
import "keen-slider/keen-slider.min.css"
import KeenSlider from "keen-slider"

function ThumbnailPlugin(main) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx) {
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

export default {
  name: "Slider",
  mounted() {
    this.slider = new KeenSlider(this.$refs.slider)
    this.thumbnail = new KeenSlider(
      this.$refs.thumbnail,
      {
        initial: 0,
        slides: {
          perView: 4,
          spacing: 10,
        },
      },
      [ThumbnailPlugin(this.slider)]
    )
  },
  beforeDestroy() {
    if (this.slider) this.slider.destroy()
    if (this.thumbnail) this.thumbnail.destroy()
  },
}
</script>

<style>
[class^="number-slide"],
[class*=" number-slide"] {
  background: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  color: #fff;
  font-weight: 500;
  height: 200px;
  max-height: 100vh;
}

.number-slide1 {
  background: rgb(64, 175, 255);
  background: linear-gradient(
    128deg,
    rgba(64, 175, 255, 1) 0%,
    rgba(63, 97, 255, 1) 100%
  );
}

.number-slide2 {
  background: rgb(255, 75, 64);
  background: linear-gradient(
    128deg,
    rgba(255, 154, 63, 1) 0%,
    rgba(255, 75, 64, 1) 100%
  );
}

.number-slide3 {
  background: rgb(182, 255, 64);
  background: linear-gradient(
    128deg,
    rgba(182, 255, 64, 1) 0%,
    rgba(63, 255, 71, 1) 100%
  );
  background: linear-gradient(
    128deg,
    rgba(189, 255, 83, 1) 0%,
    rgba(43, 250, 82, 1) 100%
  );
}

.number-slide4 {
  background: rgb(64, 255, 242);
  background: linear-gradient(
    128deg,
    rgba(64, 255, 242, 1) 0%,
    rgba(63, 188, 255, 1) 100%
  );
}

.number-slide5 {
  background: rgb(255, 64, 156);
  background: linear-gradient(
    128deg,
    rgba(255, 64, 156, 1) 0%,
    rgba(255, 63, 63, 1) 100%
  );
}

.number-slide6 {
  background: rgb(64, 76, 255);
  background: linear-gradient(
    128deg,
    rgba(64, 76, 255, 1) 0%,
    rgba(174, 63, 255, 1) 100%
  );
}

.thumbnail .keen-slider__slide {
  font-size: 30px;
  margin-top: 10px;
  height: 100px;
}
.thumbnail .keen-slider__slide {
  cursor: pointer;
}
.thumbnail .keen-slider__slide.active {
  border: 2px dashed black;
}
</style>



