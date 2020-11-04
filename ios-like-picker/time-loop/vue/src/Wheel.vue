<template>
  <div
    ref="slider"
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
import "keen-slider/keen-slider.min.css"
import KeenSlider from "keen-slider"

export default {
  name: "Wheel",
  computed: {
    slidesPerView() {
      return this.loop ? 9 : 1
    },
  },
  data() {
    return {
      slideDegree: 360 / 20,
      slider: null,
      slideValues: [],
      radius: 0,
      wheelSize: 20,
    }
  },
  props: {
    initIdx: { type: Number, default: 0 },
    loop: { type: Boolean, default: false },
    length: { type: Number },
    perspective: { type: String, default: "center" },
    label: { type: String, default: "" },
    width: { type: Number, default: 100 },
    setValue: { type: Function },
  },
  methods: {
    setSlideValues(details) {
      const offset = this.loop ? 1 / 2 - 1 / this.slidesPerView / 2 : 0

      const values = []
      for (let i = 0; i < this.length; i++) {
        const distance =
          (details.positions[i].distance - offset) * this.slidesPerView
        const rotate =
          Math.abs(distance) > this.wheelSize / 2
            ? 180
            : distance * (360 / this.wheelSize) * -1
        const style = {
          transform: `rotateX(${rotate}deg) translateZ(${this.radius}px)`,
          WebkitTransform: `rotateX(${rotate}deg) translateZ(${this.radius}px)`,
        }
        const value = this.setValue
          ? this.setValue(i, details.absoluteSlide + Math.round(distance))
          : i
        values.push({ style, value })
      }
      this.slideValues = values
    },
  },
  updated() {},
  mounted() {
    const options = {
      centered: this.loop,
      vertical: true,
      friction: 0.0025,
      initial: this.initIdx || 0,
      loop: this.loop,
      dragSpeed: (val, instance) => {
        const height = instance.details().widthOrHeight
        return (
          val *
          (height /
            ((height / 2) * Math.tan(this.slideDegree * (Math.PI / 180))) /
            this.slidesPerView)
        )
      },
      move: (s) => {
        this.setSlideValues(s.details())
      },
      rubberband: !this.loop,
      mode: "free-snap",
      slides: this.length,
      slidesPerView: this.slidesPerView,
    }
    this.slider = new KeenSlider(this.$refs.slider, options)
    this.radius = this.slider.details().widthOrHeight / 2
    this.setSlideValues(this.slider.details())
  },
  beforeDestroy() {
    if (this.slider) this.slider.destroy()
  },
}
</script>

<style>
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
