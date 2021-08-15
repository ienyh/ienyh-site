<template>
  <div class="app">
    <NavigationBar v-if="!routeIsIndex" />
    <main>
      <router-view></router-view>
    </main>
    <Footer v-if="!routeIsIndex" />
    <BackTop />
    <Music/>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import Footer from "./components/Footer";
import BackTop from "./components/BackTop.vue";
import Music from "./components/music.vue";

export default {
  name: "App",
  components: {
    Footer,
    NavigationBar,
    BackTop,
    Music,
  },
  computed: {
    routeIsIndex() {
      return this.$route.path === "/" || this.$route.path === "/index";
    },
  },
  mounted () {
    const css = `
      color: white; 
      font-size: 40px; 
      text-shadow: 2px 2px 5px #212121; 
      width: 40px;
      height: 40px;
      // background: url("https://www.chenyh.site/img/index_bg.193bdbbe.jpg") no-repeat;
      background-size: 100% 100%;
    `;
    console.table("%c🌒 welcome 🌒", css);
  }
};
</script>

<style scoped>
.app {
  min-height: 100vh;
}

.fixed {
  position: fixed;
  bottom: 15px;
  right: 15px;
  transition: all 0.2s ease-in;
  cursor: pointer;
}

.fixed:hover {
  transform: scale(1.1);
  transition: all 0.35s ease-out;
}
</style>

<style>
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 6px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 4px rgba(40, 77, 126, 0.3);
  border-radius: 4px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: #bbb;
  -webkit-box-shadow: inset 0 0 4px rgba(40, 77, 126, 0.5);
}
</style>
