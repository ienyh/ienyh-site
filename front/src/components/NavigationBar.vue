<template>
  <header class="disable-select">
    <ul class="menu-flex">
      <li 
        v-for="menu in menuList" 
        :key="menu.routerPath"
        @click="() => $router.push(menu.routerPath)" 
        class="item" 
      >
        <img :src="menu.img" style="width: 2.6rem; height: 2.6rem"/>
        <span class="menu_name" style="margin-left: 0.8rem">{{menu.name}}</span>
      </li>
    </ul>
    <span class="ienyh font-estilo">
      <strong @click="() => $router.push('/')">ienyh</strong>
      <!-- <select class="select" name="" id="">
        <option 
          v-for="item in dropList" 
          :key="item.routerPath"
          :value="item.title"
        >
          <span @click="routeTo(item.routerPath)">{{ item.title }}</span>
        </option>
      </select> -->
      <el-dropdown>
        <span class="el-dropdown-link">
          drop<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item 
              v-for="item in dropList" 
              :key="item.routerPath"
              :value="item.title"
            >
              <span @click="routeTo(item.routerPath)">{{ item.title }}</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </span>
  </header>
</template>

<script>
export default {
  name: "NavigationBar",
  data() {
    return {
      menuList: [
        {
          name: "Web Site",
          routerPath: "/tools",
          img: require("../assets/svg/website.svg"),
        },
        {
          name: "Blog",
          routerPath: "/blog",
          img: require("../assets/svg/Blog.svg"),
        },
        // {
        //   name: "3D",
        //   routerPath: "/three",
        //   img: require("../assets/svg/3D.svg"),
        // },
        {
          name: "Comments",
          routerPath: "/message",
          img: require("../assets/svg/message.svg"),
        },
      ],
      dropList: [
        { title: '上传', routerPath: '/manage', icon: '' },
        // { title: 'null', routerPath: '/manage2', icon: '' },
      ]
    };
  },
  methods: {
    routeTo (path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
header {
  position: fixed;
  width: 100vw;
  z-index: 9;
  top: 0;

  overflow: hidden;
  height: 4.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(225, 225, 225, 0.3);
  text-shadow: 0px 0px 0px rgba(225, 225, 225, 0.6);
  backdrop-filter: blur(3px);
  font-size: 1.4rem;
  /* box-shadow: .4rem .4rem .4rem rgba(9, 9, 9, 0.3); */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.menu-flex {
  display: flex;
  justify-content: start;
  align-items: center;
}

.item {
  margin: 0 0.4rem;
  padding: 0.2rem 1rem;
  font-weight: bold;
  font-size: 2.2rem;
  color: rgba(18, 150, 219, 0.7);
  cursor: pointer;
  border-radius: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item:hover {
  transition: all 0.3s ease;
  background: rgba(115, 119, 122, 0.4);
  color: rgba(18, 150, 219, 0.9);
}

.ienyh {
  margin-right: 2rem;
  font-size: 4.5rem;
  letter-spacing: 0.75rem;
  color: rgba(9, 9, 9, 0.5);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ienyh strong {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ienyh .select {
  padding: 2px 4px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.el-dropdown-link {
  letter-spacing: 2px;
  font-size: 2rem;
  margin: 0 1rem;
}

@media screen and (max-width: 599px) {
  .menu_name {
    display: none;
  }

  .ienyh strong {
    display: none;
  }
}
</style>
