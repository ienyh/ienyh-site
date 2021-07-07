<template>
  <div class="container">
    <el-tabs type="border-card" @tab-click="tabClick">
      <el-tab-pane>
        <template v-slot:label>
          嵌套路由
        </template>
        <p>嵌套路由: </p>
        <router-view></router-view>
      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
    <h2 class="font-monaco">$route.path: {{ $route.path }}</h2>
  </div>
</template>

<script>
export default {
  name: "Index",
  methods: {
    tabClick (tab) {
      console.log(tab.props.label);
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 370px;
  margin: 10px auto;
  background-color: #F2F2F2;
  width: 80%;
}
</style>