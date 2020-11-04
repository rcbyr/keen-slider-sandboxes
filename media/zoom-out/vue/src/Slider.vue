<template>
  <div class="keen-slider zoom-out" ref="slider">
    <div
      class="keen-slider__slide zoom-out__slide"
      :style="positionStyle(idx)"
      v-for="(src, idx) in images"
      :key="idx"
    >
      <img :src="src" />
    </div>
  </div>
</template>

<script>
import KeenSlider from "keen-slider"
import "keen-slider/keen-slider.min.css"

export default {
  name: "Slider",
  data() {
    return {
      images: [
        "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
        "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
        "https://images.unsplash.com/photo-1590004987778-bece5c9adab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
        "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
      ],
      details: null,
      slider: null,
    }
  },
  methods: {
    positionStyle(idx) {
      if (!this.details) return {}
      const position = this.details.positions[idx]
      const x = this.details.widthOrHeight * position.distance
      const scale_size = 0.7
      const scale = 1 - (scale_size - scale_size * position.portion)
      return {
        transform: `translate3d(${x}px, 0px, 0px) scale(${scale})`,
        WebkitTransform: `translate3d(${x}px, 0px, 0px) scale(${scale})`,
      }
    },
  },
  mounted() {
    this.slider = new KeenSlider(this.$refs.slider, {
      loop: true,
      slides: this.images.length,
      move: (s) => {
        this.details = s.details()
        this.$forceUpdate()
      },
      initial: 2,
    })
  },
  beforeDestroy() {
    if (this.slider) this.slider.destroy()
  },
}
</script>

<style>
.zoom-out {
  perspective: 1000px;
  height: 50vw;
}

@media (min-width: 768px) {
  .zoom-out {
    height: 300px;
  }
}

.zoom-out__slide {
  position: absolute;
}

.zoom-out__slide img {
  background-color: transparent;
  width: 100%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  -webkit-transform: translateY(-50%) translateX(-50%);
}
</style>
