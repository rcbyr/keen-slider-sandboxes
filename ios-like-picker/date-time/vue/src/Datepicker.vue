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
    <div :style="{ width: '150px' }">
      <Wheel
        loop
        :length="24"
        :width="140"
        perspective="right"
        :setValue="formatDate"
      />
    </div>
    <div :style="{ width: '70px' }">
      <Wheel loop :length="24" :width="23" />
    </div>
    <div :style="{ width: '70px' }">
      <Wheel loop :length="60" :width="23" perspective="left" />
    </div>
  </div>
</template>

<script>
import Wheel from "./Wheel"
import { format, subDays } from "date-fns"

export default {
  components: {
    Wheel,
  },
  name: "Datepicker",
  methods: {
    formatDate(idx) {
      return format(subDays(new Date(), idx), "iii d LLL")
    },
  },
}
</script>

<style></style>
