<template>
  <div ref="slider1" class="keen-slider first">
    <div class="keen-slider__slide number-slide1">Slider 1</div>
    <div class="keen-slider__slide number-slide2" style="min-width: 100%; max-width: 100%">
      <div ref="slider2" class="keen-slider" style="min-width: 100%; max-width: 100%">
        <div class="keen-slider__slide number-slide1">Slider 2</div>
        <div class="keen-slider__slide number-slide2">Slider 2</div>
        <div class="keen-slider__slide number-slide3">Slider 2</div>
      </div>
    </div>
    <div class="keen-slider__slide number-slide3">
      <div ref="slider3" class="keen-slider" style="height: 200px; width: 100%;">
        <div class="keen-slider__slide number-slide1">Slider 3</div>
        <div class="keen-slider__slide number-slide2">Slider 3</div>
        <div class="keen-slider__slide number-slide3">Slider 3</div>
      </div>
    </div>
    <div class="keen-slider__slide number-slide4">Slider 1</div>
  </div>
</template>

<script>
import { useKeenSlider } from 'keen-slider/vue.es'
import 'keen-slider/keen-slider.min.css'


export default {
  setup(){
    const [slider1] = useKeenSlider({
      slides: {
        origin: "center",
      },
      selector: ".first > .keen-slider__slide",
    })
     const [slider2] = useKeenSlider({
      rubberband: false,
      slides: {
        perView: 1.3,
      },
    })
     const [slider3] = useKeenSlider( {
      rubberband: false,
      slides: {
        perView: 1.3,
      },
      vertical: true,
    })
    return { slider1, slider2, slider3 }
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
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
</style>
