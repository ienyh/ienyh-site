<template>
  <footer class="footer font-size-middle">
    <a>ienyh</a>
    <el-divider
        direction="vertical"
        style="background-color: black"
    ></el-divider>
    <p>17513366907@163.com</p>
  </footer>
</template>

<script>
export default {
  name: "Footer.vue"
}
</script>

<style scoped>
.footer {
  font-family: Monaco, monospace;
  text-align: center;
  padding: 10px;
  border-top: #c3c3c3 2px solid;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  color: #000;
  background-color: #c3c3c3;
  background-image: linear-gradient(0deg, #c3c3c3 0%, #d6d6d6 46%, #f0f0f0 100%);

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>