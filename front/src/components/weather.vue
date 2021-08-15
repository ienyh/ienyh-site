<template>
	<div class="weather_container">
		<img class="bg_img" src="../assets/poly_background.png">
    div
	</div>
</template>

<script>
export default {
  name: "weather",
}
</script>

<style scoped>
.weather_container {
  position: relative;
  overflow: hidden;
  width: 100%;
  border: 1px solid navy;
  border-radius: 1rem;
}

.bg_img {
  object-fit: fill;
  z-index: -99;
}
</style>