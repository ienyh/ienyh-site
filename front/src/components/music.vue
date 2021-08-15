<template>
  <div class="music">
    <div class="left-container">
      <span style="font-size: 1.6rem; color: #f5f5f5">start</span>
    </div>
    <div class="right-container">
      <img src="../assets/svg/music.svg" style="width: 2rem;"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "music-play",
}
</script>

<style scoped>
.music {
  position: fixed;
  bottom: 1rem;
  left: -8rem;
  border-bottom-right-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
  height: 5rem;
  width: 10rem;
  overflow: hidden;
  background: rgba(225, 225, 225, 0.3);
  backdrop-filter: blur(0.15rem);
  box-shadow: 1px 1px #73777a;

  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all .2s ease-in;
}

@media screen and (max-width: 750px) {
  .music {
    display: none;
  }
}

.left-container {
  flex: 4;
  height: inherit;
  background-image: url("../assets/index_bg.jpg");
  background-size: 100% 100%;
  opacity: 0.8;
  border-bottom-right-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}

.right-container {
  flex: 1;
  height: inherit;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.music:hover {
  left: 0;
  transition: all 0.3s ease-out;
}
</style>