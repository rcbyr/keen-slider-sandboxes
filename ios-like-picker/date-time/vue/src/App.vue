<template>
  <Datepicker />
</template>

<script>
import Datepicker from "./Datepicker"

export default {
  name: "App",
  components: {
    Datepicker,
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
</style>
