<template>
  <div class="keen-slider" ref="slider">
    <div
      class="keen-slider__slide lazy__slide"
      v-for="(src, idx) in images"
      :key="idx"
    >
      <img :src="loaded[idx] ? src : ''" />
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
      loaded: [],
      slider: null,
    }
  },
  mounted() {
    this.slider = new KeenSlider(this.$refs.slider, {
      afterChange: (s) => {
        const idx = s.track.details.rel
        this.loaded[idx] = true
        this.$forceUpdate()
      },
      loop: true,
      initial: 0,
    })
  },
  beforeDestroy() {
    if (this.slider) this.slider.destroy()
  },
}
</script>

<style>
.lazy__slide {
  height: 50vw;
  background: rgb(255, 75, 64);
  background-color: linear-gradient(
    0deg,
    rgba(255, 75, 64, 1) 0%,
    rgba(255, 154, 63, 1) 100%
  );
  background-image: url("https://keen-slider.io/images/loader.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 100px;
  min-height: auto;
}

@media (min-width: 768px) {
  .lazy__slide {
    height: 300px;
  }
}

.lazy__slide img {
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