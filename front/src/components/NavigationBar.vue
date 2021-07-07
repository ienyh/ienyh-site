<template>
  <el-affix :offset="0">
    <header class="font-monaco">
      <el-menu
        router="true"
        :default-active="individual"
        class="el-menu-demo menu-flex font-serif"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="individual" class="item">
          首页
        </el-menu-item>
        <el-menu-item index="tools" class="item">
          工具集
        </el-menu-item>
        <el-menu-item index="note" class="item">
          <!-- <router-link to="/note">博客</router-link> -->
          博客
        </el-menu-item>
      </el-menu>

      <el-dropdown>
        <span class="el-dropdown-link ienyh font-color-black">
          <strong>ienyh</strong>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="() => $router.push('/individual')"
              >个人主页</el-dropdown-item
            >
            <el-dropdown-item @click="() => $router.push('/index')"
              >网站首页</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </header>
  </el-affix>
</template>

<script>
export default {
  name: "NavigationBar",
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  font-size: 20px;
  border-radius: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.4);
}

.menu-flex {
  display: flex;
  justify-content: start;
  align-items: center;
}

.item {
  font-size: 16px;
}

.item:hover {
  border-radius: 2px;
  box-shadow: 5px 5px 10px #c1c1c1, -5px -5px 10px #ffffff;
  transition: all 0.3s ease;
}

.ienyh {
  margin-right: 20px;
  font-size: 18px;
}

/* 路由激活样式 */
.router-link-active {
  font-size: 22px;
  font-weight: bold;
}
</style>
