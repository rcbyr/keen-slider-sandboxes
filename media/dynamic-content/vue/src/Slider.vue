<template>
  <div class="keen-slider" ref="slider">
     <div class="keen-slider__slide">
    <div>{{ names[indexes[0]] }}</div>
    </div>
    <div class="keen-slider__slide">
      <div>{{ names[indexes[1]] }}</div>
    </div>
  </div>
</template>

<script>
import KeenSlider from "keen-slider"
import "keen-slider/keen-slider.min.css"
import names from "./names"
names.length = 500

export default {
  name: "Slider",
  data() {
    return {
      names,
      indexes: [],
      slider: null,
    }
  },
  mounted() {
    this.slider = new KeenSlider(this.$refs.slider, {
        initial: 0,
        loop: {
          min: 0,
          max: names.length - 1,
        },
        range: {
          align: true,
          min: 0,
          max: names.length - 1,
        },
        mode: "free-snap",
        detailsChanged: (s) => {
          this.indexes = s.track.details.slides.map((slide) => {
            return slide.abs
          })
        },
        slides: {
          number: 2,
          perView: 1,
        },
      })
  },
  beforeDestroy() {
    if (this.slider) this.slider.destroy()
  },
}
</script>

<style>
.keen-slider__slide {
  display: flex;
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
}

</style>