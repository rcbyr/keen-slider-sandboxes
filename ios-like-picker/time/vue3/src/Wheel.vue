<template>
  <div
    ref="container"
    :class="'wheel keen-slider wheel--perspective-' + perspective"
  >
    <div
      class="wheel__shadow-top"
      :style="{
        transform: `translateZ(${radius}px)`,
        '-webkit-transform': `translateZ(${radius}px)`,
      }"
    ></div>
    <div class="wheel__inner">
      <div class="wheel__slides" :style="{ width: `${width}px` }">
        <div
          v-for="(slide, index) in slideValues"
          :key="index"
          class="wheel__slide"
          :style="slide.style"
        >
          <span>{{ slide.value }}</span>
        </div>
      </div>
      <div
        v-if="label"
        class="wheel__label"
        :style="{
          transform: `translateZ(${radius}px)`,
          '-webkit-transform': `translateZ(${radius}px)`,
        }"
      >
        {{ label }}
      </div>
    </div>
    <div
      class="wheel__shadow-bottom"
      :style="{
        transform: `translateZ(${radius}px)`,
        '-webkit-transform': `translateZ(${radius}px)`,
      }"
    ></div>
  </div>
</template>

<script>
import { useKeenSlider } from "keen-slider/vue.es"
import "keen-slider/keen-slider.min.css"

export default {
  props: {
    initIdx: { type: Number, default: 0 },
    loop: { type: Boolean, default: false },
    length: { type: Number },
    perspective: { type: String, default: "center" },
    label: { type: String, default: "" },
    width: { type: Number, default: 100 },
    setValue: { type: Function },
  },
  setup() {
    // function setSlideValues(details) {
    //   const offset = this.loop ? 1 / 2 - 1 / this.slidesPerView / 2 : 0

    //   const values = []
    //   for (let i = 0; i < this.length; i++) {
    //     const distance =
    //       (details.slides[i].distance - offset) * this.slidesPerView
    //     const rotate =
    //       Math.abs(distance) > this.wheelSize / 2
    //         ? 180
    //         : distance * (360 / this.wheelSize) * -1
    //     const style = {
    //       transform: `rotateX(${rotate}deg) translateZ(${this.radius}px)`,
    //       WebkitTransform: `rotateX(${rotate}deg) translateZ(${this.radius}px)`,
    //     }
    //     const value = this.setValue
    //       ? this.setValue(i, details.abs + Math.round(distance))
    //       : i
    //     values.push({ style, value })
    //   }
    //   this.slideValues = values
    // }
    const options = {
      selector: null,
      //   slides: {
      //     number: this.length,
      //     origin: this.loop ? "center" : "auto",
      //     perView: this.slidesPerView,
      //   },
      //   vertical: true,
      //   initial: this.initIdx || 0,
      //   loop: this.loop,
      //   created: (s) => {
      //     this.height = s.size
      //     this.radius = this.height / 2
      //     setSlideValues(s.track.details)
      //   },
      //   updated: (s) => {
      //     this.height = s.size
      //   },
      //   dragSpeed: (val) => {
      //     return (
      //       val *
      //       (this.height /
      //         ((this.height / 2) * Math.tan(this.slideDegree * (Math.PI / 180))) /
      //         this.slidesPerView)
      //     )
      //   },
      //   detailsChanged: (s) => {
      //     setSlideValues(s.track.details)
      //   },
      //   rubberband: !this.loop,
      //   mode: "free-snap",
    }
    const [container] = useKeenSlider(options)
    return { container }
  },
}
</script>

<style>
body {
  margin: 0;
  font-family: "Inter", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.wheel {
  color: #fff;
  display: block;
  height: 100%;
  overflow: visible;
  width: 100%;
}
.wheel--perspective-right .wheel__inner {
  perspective-origin: calc(50% + 100px) 50%;
  transform: translateX(10px);
  -webkit-transform: translateX(10px);
}
.wheel--perspective-left .wheel__inner {
  perspective-origin: calc(50% - 100px) 50%;
  transform: translateX(-10px);
  -webkit-transform: translateX(-10px);
}

.wheel__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  transform-style: preserve-3d;
  height: 16%;
  width: 100%;
}

.wheel__slides {
  height: 100%;
  position: relative;
  width: 100%;
}

.wheel__shadow-top,
.wheel__shadow-bottom {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  left: 0;
  height: calc(42% + 2px);
  width: 100%;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.3);
  position: relative;
  margin-top: -2px;
  z-index: 5;
}

.wheel__shadow-bottom {
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.9) 100%
  );
  margin-top: 2px;
  border-bottom: none;
  border-top: 0.5px solid rgba(255, 255, 255, 0.3);
}

.wheel__label {
  font-weight: 500;
  font-size: 15px;
  line-height: 1;
  margin-top: 1px;
  margin-left: 5px;
}

.wheel__slide {
  align-items: center;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  display: flex;
  font-size: 20px;
  font-weight: 400;
  height: 100%;
  width: 100%;
  position: absolute;
  justify-content: flex-end;
}
</style>
