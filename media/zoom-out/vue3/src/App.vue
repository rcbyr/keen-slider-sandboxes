<template>
  <div class="keen-slider zoom-out" ref="container">
    <div
      class="keen-slider__slide zoom-out__slide"
      
      v-for="(src, idx) in images"
      :key="idx"
    >
      <div :style="scales[idx]">
        <img :src="src" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useKeenSlider } from "keen-slider/vue.es";
import "keen-slider/keen-slider.min.css";

export default {
  setup() {
    const images = [
      "https://images.unsplash.com/photo-1590004953392-5aba2e72269a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
      "https://images.unsplash.com/photo-1590004845575-cc18b13d1d0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
      "https://images.unsplash.com/photo-1590004987778-bece5c9adab6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
      "https://images.unsplash.com/photo-1590005176489-db2e714711fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=500&w=800&q=80",
    ];
    const scales = ref([]);
    const [container] = useKeenSlider({
      loop: true,
      detailsChanged: (s) => {
        const slides = s.track.details.slides
        scales.value = (s.slides.map((_element, idx) => {
          const slide = slides[idx]
          const scale_size = 0.7
          const scale = 1 - (scale_size - scale_size * slide.portion)
          return `scale(${scale})`
        }))
      },
      initial: 2,
    });
    return { container, images, scales };
  },
};
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

.zoom-out__slide div {
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
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
