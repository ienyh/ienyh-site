<template>
  <footer class="footer font-size-small">
    <div class="left">
      <img 
        class="footer-icon-img disable-select" 
        src="wyy.jpg" 
      />
      <el-divider
        direction="vertical"
        style="background-color: black"
        class="footer_item"
      ></el-divider>
      <a href="https://github.com/ienyh" target="_blank" class="footer_item">ienyh</a>
      <el-divider
        direction="vertical"
        style="background-color: black"
        class="footer_item"
      ></el-divider>
      <a href="https://github.com/ienyh/ienyh-site" target="_blank" class="footer_item">
        本网站开源 & github 地址
      </a>
      <el-divider
        direction="vertical"
        style="background-color: black"
        class="footer_item"
      ></el-divider>
      <p class="footer_item">copyright©www.chenyh.site</p>
      <el-divider
        direction="vertical"
        style="background-color: black"
      ></el-divider>
      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">
        豫ICP备2021020011号-1
      </a>
    </div>
    <div class="right">
      <img 
        v-for="icon in icons" 
        :key="icon.title"
        class="footer-icon-img" 
        :src="icon.icon" 
        :title="icon.info"
        @click="toBlankPage(icon.url)" 
      />
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer.vue",
  data () {
    return {
      icons: [
        {
          title: "QQ",
          info: "1449101002",
          icon: require("../assets/svg/qq-grey.svg"),
        },
        {
          title: "WeChat",
          info: "ienyh_",
          icon: require("../assets/svg/wechat-grey.svg"),
        },
        {
          title: "GitHub",
          info: "ienyh",
          icon: require("../assets/svg/github-grey.svg"),
          url: "https://github.com/ienyh",
        },
        {
          title: "CSDN",
          info: "ienyh",
          icon: require("../assets/svg/csdn-grey.svg"),
          url: "https://blog.csdn.net/qq_45265059",
        },
      ]
    }
  },
  methods: {
    toBlankPage (url) {
      if (url) {
        window.open(url, "_blank");
      }
    }
  }
};
</script>

<style scoped>
.footer {
  font-size: 1.4rem;
  min-height: 30px;
  padding: 10px;
  border-top: #c3c3c3 2px solid;
  color: #000;
  background-color: #373d41;

  display: flex;
  justify-content: space-around;
  align-items: center;
}

a, p {
  color: #73777a;
  cursor: pointer;
  padding: 0 2px;
}

a:hover, p:hover {
  color: #373d41;
  cursor: pointer;
  background: #73777a;
  border-radius: 3px;
}

.left {
  display: flex;
  justify-content: start;
  align-items: center;
}

.right {
  display: flex;
  justify-content: end;
  align-items: center;
}

.footer-icon-img {
  margin-left: 8px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 3px;
}

@media screen and (max-width: 750px) {
  .footer_item {
    display: none;
  }
}

@media screen and (max-width: 375px) {
  .right {
    display: none;
  }
}
</style>
