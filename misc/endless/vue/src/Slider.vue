<template>
  <div ref="slider" class="keen-slider">
    <div
      v-for="(value, idx) in slideValues"
      :key="idx"
      class="keen-slider__slide endless-slide"
      :style="getStyle(value)"
    >
      {{ value }}
    </div>
  </div>
</template>

<script>
import "keen-slider/keen-slider.min.css"
import KeenSlider from "keen-slider"
import randomColor from "randomcolor"

export default {
  name: "Slider",
  computed: {
    slideValues() {
      if (!this.details) return [0, 1]
      const values = []
      for (let i = 0; i < 2; i++) {
        const distance = this.details.positions[i].distance
        const value = this.details.absoluteSlide + Math.round(distance)
        values.push(value)
      }
      return values
    },
  },
  data() {
    return {
      details: null,
    }
  },
  methods: {
    getStyle(value) {
      return {
        "background-color": randomColor({
          seed: Math.abs(value),
          luminosity: "light",
        }),
      }
    },
  },
  mounted() {
    this.slider = new KeenSlider(this.$refs.slider, {
      initial: 0,
      loop: true,
      mode: "free-snap",
      move: (s) => {
        this.details = s.details()
      },
    })
  },
  beforeDestroy() {
    if (this.slider) this.slider.destroy()
  },
}
</script>

<style>
.endless-slide {
  background: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 500;
  height: 200px;
}
</style>
