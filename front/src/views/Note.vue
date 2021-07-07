<template>
  <div class="container">
    <div class="content">
      <router-view></router-view>
    </div>
    <RightBar style="margin-left: 15px;" />
  </div>
</template>

<script>
import RightBar from "../components/RightBar";

export default {
  name: "Note",
  components: {
    RightBar,
  },

}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 10px 0;
  background-color: #f5f5f5;
  min-height: 450px;
}

.content {
  /*min-height: 370px;*/
  width: 55%;
  padding: 4px 0;
}



</style>