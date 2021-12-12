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
          indexes = s.track.details.slides.map((slide) => {
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
