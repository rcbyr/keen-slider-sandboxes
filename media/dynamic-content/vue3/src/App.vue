<template>
  <div class="keen-slider" ref="container">
    <div class="keen-slider__slide">
      <div>{{ names[indexes[0]] }}</div>
    </div>
    <div class="keen-slider__slide">
      <div>{{ names[indexes[1]] }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useKeenSlider } from "keen-slider/vue.es";
import "keen-slider/keen-slider.min.css";
import names from "./names"
names.length = 500

export default {
  setup() {
    const indexes = ref([]);
    const [container] = useKeenSlider({
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
          indexes.value = s.track.details.slides.map((slide) => {
            return slide.abs
          })
        },
        slides: {
          number: 2,
          perView: 1,
        },
      });
    return { container, indexes, names };
  },
};
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
