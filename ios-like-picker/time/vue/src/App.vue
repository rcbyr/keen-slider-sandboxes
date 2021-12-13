<template>
  <div
    :style="{
      height: '200px',
      padding: '50px',
      display: 'flex',
      'justify-content': 'center',
      background: '#000',
    }"
  >
    <div :style="{ width: '70px' }">
      <Wheel :initIdx="1" :length="24" :width="23" />
    </div>
    <div :style="{ width: '70px' }">
      <Wheel :initIdx="35" :length="60" :width="23" perspective="left" />
    </div>
  </div>
</template>

<script>
import Wheel from "./Wheel"
export default {
  components: {
    Wheel,
  },
  name: "Timepicker",
}
</script>

<style></style>