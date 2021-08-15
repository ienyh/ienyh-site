<template>
  <div class="three-container">
    <div class="demo-window">
      <router-view></router-view>
    </div>
    <div class="msg font-hack">
      <ul>
        <li 
          v-for="demo in demos" 
          :key="demo.path"
          @click="() => $router.push(demo.path)"
          style="cursor: pointer"
        >{{ demo.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "three-laboratory",
  data () {
    return {
      demos: [
        { name: "demo-1", path: "/three/demo1" },
        { name: "demo-2", path: "/three/demo2" },
      ],
    };
  },
}
</script>

<style scoped>
.three-container {
  display: flex;
  justify-content: space-evenly;
  align-items: start;
  min-height: 90vh;
  padding-top: 5.5rem;
}

.demo-window {
  flex: 5;
  margin: 1rem;
  height: 56rem;
  border: 1px solid #373d41;
  border-radius: .5rem;
  overflow: hidden;
  padding: 0;
}

.msg {
  flex: 1;
  margin: 1rem;
  padding: 1rem 2rem;
  font-size: 1.6rem;
  border: 2px solid #373d41;
  border-radius: 1rem;
  overflow: hidden;
}
</style>
