<template>
  <div class="container">
    <div class="content">
      <router-view></router-view>
    </div>
    <RightBar style="margin-left: 15px; width: 20%" />
  </div>
</template>

<script>
import RightBar from "../components/RightBar";

export default {
  name: "Note",
  components: { RightBar },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 5.5rem 0 0 0;
  min-height: 100vh;
}

.content {
  width: 58%;
  padding: .4rem 0;
}

@media screen and (max-width: 1000px) {
  .content {
    width: 90%;
  }
}

@media screen and (max-width: 1000px) {
  .content {
    width: 95%;
  }
}
</style>
