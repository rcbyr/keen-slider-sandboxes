<template>
  <div
    ref="slider"
    :style="{
      'background-image':
        'linear-gradient(' +
        rotation +
        'deg, black 0px, black 50%, white 50%, white 100%)',
    }"
    class="background-rotation"
  >
    <div
      class="background-rotation__inner"
      :style="{
        'background-image':
          'linear-gradient(' +
          rotation +
          'deg, white 0px, white 50%, black 50%, black 100%)',
      }"
    >
      <span>keen-slider</span>
    </div>
  </div>
</template>

<script>
import "keen-slider/keen-slider.min.css"
import KeenSlider from "keen-slider"
export default {
  name: "Slider",
  data() {
    return {
      rotation: 0,
      slider: null,
    }
  },
  mounted() {
    this.slider = new KeenSlider(this.$refs.slider, {
      slides: 2,
      move: (s) => {
        const progress = s.details().progressTrack
        const delta = -progress
        this.rotation = delta * 360
      },
      loop: true,
    })
  },
  beforeDestroy() {
    if (this.slider) this.slider.destroy()
  },
}
</script>

<style>
.background-rotation {
  height: 200px;
  position: relative;
  justify-content: center;
  color: #fff;
  background-size: 100% 200%;
}

.background-rotation * {
  user-select: none;
  -webkit-user-select: none;
}

.background-rotation__inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 100% 200%;
  color: rgb(98, 105, 105);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  display: block;
  text-align: center;
  line-height: 200px;
}

.background-rotation__inner span {
  font-size: 30px;
  font-weight: bold;
}
</style>
