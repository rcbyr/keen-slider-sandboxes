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
import {  ref } from 'vue'
import { useKeenSlider } from 'keen-slider/vue.es'
import 'keen-slider/keen-slider.min.css'


export default {
  setup(){
    const images = [
      "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
      "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
      "https://images.unsplash.com/photo-1590004987778-bece5c9adab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
      "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    ];
    const loaded = ref([])
    const [container] = useKeenSlider({
      afterChange: (s) => {
        const idx = s.track.details.rel
        loaded[idx] = true
        this.$forceUpdate()
      },
      loop: true,
      initial: 0,
    })
    return { container, images, loaded }
  }
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
