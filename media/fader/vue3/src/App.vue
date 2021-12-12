<template>
  <div ref="container" class="fader">
    <div
      v-for="(src, idx) in images"
      :key="idx"
      class="fader__slide"
      :style="{ opacity: opacities[idx] }"
    >
      <img :src="src" />
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
    const opacities = ref([])
    const [container] = useKeenSlider({
      slides: images.length,
      loop: true,
      defaultAnimation: {
        duration: 3000
      },
      detailsChanged: (s) => {
        opacities.value = s.track.details.slides.map((slide) => slide.portion)
      },
    })
    return { container, images, opacities }
  }
}
</script>

<style>

.fader {
  height: 50vw;
  position: relative;
  overflow: hidden;
}

@media (min-width: 768px) {
  .fader {
    height: 300px;
  }
}

.fader__slide {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
}

.fader img {
  width: 100%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  -webkit-transform: translateY(-50%) translateX(-50%);
}
</style>
