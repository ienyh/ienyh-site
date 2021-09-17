<template>
  <div class="right-bar animated bounceInRight">
    <div v-if="$route.path === '/blog'" class="bar-content">
      <el-avatar
        class="avatar"
        shape="circle"
        :size="100"
        :title="name"
        :src="avatar_url"
        @error="() => true"
        @click="clickImg"
      >
        <el-image>
          <template #error>
            <div class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </template>
        </el-image>
      </el-avatar>
      <h2 class="font-monaco" style="text-align: center; font-size: 3rem;">
        <strong>{{ name }}</strong>
      </h2>
      <p style="text-align: center;">{{ signature }}</p>
      <div class="label-container">
        <el-tag
          v-for="tag in tags"
          :key="tag"
          class="tag"
          type="info"
          :title="tag"
          >{{ tag }}</el-tag
        >
      </div>
      <el-divider><h4 class="divider-content">社交主页</h4></el-divider>
      <div class="icon-container">
        <div
          v-for="msg in social_messages"
          :key="msg.title"
          class="icon"
        >
          <a v-if="msg.link" :href="msg.link" target="_blank">
            <img :src="msg.icon" class="icon_img"/>
          </a>
          <img v-else :src="msg.icon" class="icon_img"/>
          <div id="QRcodeImg">
            <span>{{ msg.hoverMsg }}</span>
            <img v-if="msg.hoverImg" :src="msg.hoverImg" class="qrcode_img"/>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else id="title_bar" class="title_bar">
      <el-tree :data="title_list" @node-click="handleNodeClick" empty-text="没有标题 🤒"></el-tree>
    </div>
    <Weather style="margin: 10px 0; height: 6rem; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);" />
  </div>
</template>

<script>
import Weather from './weather.vue';

export default {
  name: "RightBar",
  components: { Weather },
  data() {
    return {
      name: "ienyh",
      signature: "这人真懒呀，就啥也不写。。。",
      avatar_url: "wyy.jpg",
      tags: [
        "大三学生 🎒",
        "ncwuer",
        "Javascript 👨‍💻",
        "工作在找了在找了",
        "一天不学我浑身难受 🎒",
        "LOL资深大乱斗玩家 🎲",
        "我爱写博客 🤒",
      ],
      social_messages: [
        {
          title: "github",
          icon: require("../assets/svg/github.svg"),
          link: "https://github.com/ienyh",
          hoverMsg: "github@ienyh",
        },
        {
          title: "csdn",
          icon: require("../assets/svg/csdn.svg"),
          link: "https://blog.csdn.net/qq_45265059",
          hoverMsg: "csdn@ienyh",
        },
        {
          title: "email",
          icon: require("../assets/svg/email.svg"),
          hoverMsg: "17513366907@163.com",
        },
        {
          title: "wechat",
          icon: require("../assets/svg/wechat.svg"),
          hoverImg: require("../assets/img/wechat.jpg"),
        },
        {
          title: "qq",
          icon: require("../assets/svg/qq.svg"),
          hoverImg: require("../assets/img/qq.png"),
        },
      ],
      title_list: [
        {
          label: "title-1",
          children: [{ label: "title-2", temp: "title-2" }],
        },
        {
          label: "title-1",
          children: [{ label: "title-2", temp: "title-2" }],
        }
      ]
    };
  },
  methods: {
    clickImg() {
      window.open(this.avatar_url, "_blank");
    },
  },
  mounted () {
    // console.log(this.$route);
  }
};
</script>

<style scoped>
.right-bar {
  cursor: default;
  position: relative;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 1000px) {
  .right-bar {
    display: none;
  }
}

.bar-content {
  display: inline-block;
  background-color: #fff;
  padding: .5rem;
  border-radius: .8rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 头像 */
.avatar {
  display: block;
  margin: 1rem auto;
  cursor: pointer;
  transition: all 0.2s ease-in;
}

.avatar:hover {
  transform: scale(1.15) rotate(360deg); 
  /* -moz-transform:scale(1.2);
  -webkit-transform:scale(1.2);
  -o-transform:scale(1.2); */
  transition: all 0.5s ease-out;
}

.label-container {
  display: flex;
  flex-wrap: wrap;
  margin: .2rem;
}

.tag {
  display: block;
  margin: 2px;
  font-size: .8rem;
  color: #000;
}

.tag:hover {
  background-color: #373d41;
  color: #f6f5e7;
}

.icon-container {
  margin: 0 0 .2rem 0;
  padding: 0 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-container .icon {
  margin: 0 .4rem;
  cursor: pointer;
  transition: all 0.2s ease-in;
  position: relative;
}

#QRcodeImg {
  display: none;
  padding: 0.4rem;
  position: absolute;
  bottom: 100%;
  left: -50%;
  transform: translateY(-10%);
  z-index: 22;

  background: #373d41;
  color: #73777a;
  border-radius: 0.8rem;
  border: 1px solid #73777a;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.icon_img {
  width: 3.2rem;
  height: 3.2rem;
}

.qrcode_img {
  width: 5rem;
  height: 5rem;
}

.icon:hover {
  transform: scale(1.15) translateY(-5px);
  transition: all 0.35s ease-out;
}

.icon:hover #QRcodeImg {
  display: block;
}


.title_bar {
  border-radius: 1rem;
  background: #fff;
  margin-top: 1rem;
  width: 100%;
  overflow: hidden;
  padding: 1rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

</style>
