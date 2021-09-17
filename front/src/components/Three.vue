<template>
  <div id="three" class="three">three</div>
</template>

<script>
import { ThreeComponent } from '../utils/ThreeComponent';

export default {
  mounted () {
    const three = new ThreeComponent({ id: 'three' });
    console.log(three);
  }
}
</script>

<style scoped>
.three {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 20px;
  left: 0;
  right: 20px;
  z-index: -99;
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>