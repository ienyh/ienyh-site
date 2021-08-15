<template>
  <div class="container">
    <h1>页面没找到 <a style="color: blue; cursor: pointer" @click="() => $router.go(-1)">返回</a></h1>
  </div>
</template>

<script>
export default {
  name: "404",
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 95vh;
  padding-top: 4.5rem;
}
</style>
