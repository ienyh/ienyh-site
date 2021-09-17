<template>
  <div class="container disable-select">
    <canvas id="curvejs"></canvas>
    <div class="ienyh font-estilo" @click="toApp">Ienyh's Blog</div>
    <details class="font-harmony ">
      <summary style="font-size: 1.6rem">展开</summary>
      <div class="card">
        <input type="text">
      </div>
    </details>

    <three />
  </div>
</template>

<script>
import three from '../components/Three.vue';

export default {
  name: "Index",
  components: { three },
  methods: {
    toApp () {
      this.$router.push("/blog");
    },
  },
};
</script>

<style scoped>
.container {
  position: fixed;
  width: 100%;
  height: 100%;
  text-align: center;
  background: url("../assets/cool_bg.png") rgba(200, 200, 200, 0.7);
  opacity: 0.9;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card {
  border-radius: .8rem;
  padding: 1.2rem 4rem;
  background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.2));
  backdrop-filter: blur(0.4rem);
  box-shadow: 1rem 1rem 2rem rgba(0, 0, 0, 0.2);
  font-size: 1.6rem;
  color: rgba(0, 0, 0, 0.87);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (min-width: 700px) {
  .ienyh {
    text-transform: uppercase;
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
}

@media screen and (max-width: 699px) {
  .ienyh {
    text-transform: uppercase;
    background-color: rgba(56, 61, 65, 0.2);
    border-radius: .8rem;
    font-size: 4rem;
    letter-spacing: 1.5rem;
    text-shadow: 0px 0px 0px rgba(225, 225, 225, 0.9);
    -webkit-text-fill-color: transparent;
    transition: all 0.35s ease;
    backdrop-filter: blur(0.1rem);
    box-shadow: 1rem 1rem 2rem rgba(0, 0, 0, 0.2);
    padding: 0 20px;
  }
}
</style>
