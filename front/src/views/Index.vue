<template>
  <div class="container font-estilo disable-select">
    <span class="ienyh" @click="toApp">Ienyh's Blog</span>
    <img class="bg" src="../assets/index_bg.jpg"/>
  </div>
</template>

<script>
export default {
  name: "Index",
  methods: {
    toApp () {
      this.$router.push("/blog");
    },
  },
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100vh;
  background-size: 100% 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -99;
  /* opacity: 0.95; */
}

.ienyh {
  padding: 1rem 4rem;
  font-size: 5rem;
  letter-spacing: 1rem;
  font-weight: bolder;
  cursor: pointer;
  text-shadow: 1px 1px 3px #73777a;
  -webkit-text-fill-color: transparent;
  transition: all 0.2s ease;
}

.ienyh:hover {
  background-color: rgba(56, 61, 65, 0.2);
  border-radius: 2rem;
  font-size: 7rem;
  letter-spacing: 2.4rem;
  text-shadow: 0px 0px 0px rgba(225, 225, 225, 0.9);
  -webkit-text-fill-color: transparent;
  transition: all 0.35s ease;
  backdrop-filter: blur(0.1rem);
  box-shadow: 1rem 1rem 2rem rgba(0, 0, 0, 0.2);
}

.container {
  position: fixed;
  width: 100%;
  height: 100%;
  text-transform: uppercase;
  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 1000px) {
  .bg {
    display: none;
  }

  .ienyh:hover {
    background-color: rgba(56, 61, 65, 0.5);
    border-radius: 1rem;
    font-size: 6rem;
    letter-spacing: 2rem;
    text-shadow: 0px 0px 0px rgba(225, 225, 225, 0.9);
    -webkit-text-fill-color: transparent;
    transition: all 0.35s ease;
    backdrop-filter: blur(0.1rem);
    box-shadow: 1rem 1rem 2rem rgba(0, 0, 0, 0.2);
  }
}
</style>
