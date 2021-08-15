<template>
  <div>
    <div class="title-header" :class="headerNoneDisplay ? 'unvisable' : 'visable'">
      <h1>{{ $route.params.id }} -- chenyh</h1>
    </div>

    <el-page-header class="disable-select font-harmony" @back="() => $router.go(-1)">
      <template #title>
        <el-tag class="font-size-small back-tag" type="info">back</el-tag>
      </template>
      <template #content>
        <div class="classify">
          <el-tag class="font-size-small" type="info">ienyh</el-tag>
          <el-divider direction="vertical"></el-divider>
          <el-tag class="font-size-small" type="info">Javascript</el-tag>
          <el-divider direction="vertical"></el-divider>
          <el-tag class="font-size-small" type="info">{{
            new Date().toLocaleDateString()
          }}</el-tag>
        </div>
      </template>
    </el-page-header>
    <div class="blog_container">
      <!-- <h1>title id: {{ $route.params.id }}</h1> -->
      <v-md-preview
        :text="str"
        @copy-code-success="handleCopyCodeSuccess"
      ></v-md-preview>
    </div>
    <div class="blog_footer">
      --------- 我也是有底线的啦 😆 ---------
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from 'element-plus'; 

export default {
  name: "Blog",
  data() {
    return {
      str: "",
      oldScrollTop: 0, // 滚动前，滚动条距文档顶部的距离
      headerNoneDisplay: true,
    };
  },
  mounted () {
    // 请求数据
    axios.get(`md/${this.$route.params.id}.md`)
      .then(res => res.data)
      .then(data => { this.str = data })
      .catch(console.warn);

    window.addEventListener("scroll", () => {
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
				document.body.scrollTop
			// 滚动条滚动的距离
			let scrollStep = scrollTop - this.oldScrollTop;
			// 更新——滚动前，滚动条距文档顶部的距离
			this.oldScrollTop = scrollTop;
			if (scrollStep < 0) {
				this.headerNoneDisplay = true; // 向上滚动
			} else {
        this.headerNoneDisplay = false; // 向下滚动
			}
		});

    // const md = document.querySelector(".github-markdown-body").getElementsByTagName("h2");
    // console.log(md);
    // const h2s = Array.from(md).map(item => item.innerText);
    // console.log(h2s);
  },
  methods: {
    handleCopyCodeSuccess () {
      ElMessage.success({
        message: "copied!",
        showClose: true,
      });
    },
  },
};
</script>

<style>
.title-header {
  width: 100%;
  height: 4.5rem;
  background: #f5f5f5;
  position: fixed;
  
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
}

.visable {
  /* opacity: 1; */
  top: 0;
  transition: top .2s ease-out;
}

.unvisable {
  /* opacity: 0; */
  top: -4.5rem;
  transition: top .1s ease-in;
}

.blog_container {
  display: block;
  margin-top: 5px;
  /* padding: 5px; */
  background-color: #fff;
  border-radius: 8px;
  font-family: "HarmonyOS_Sans_Regular", sans-serif;
}

.blog_container code {
  font-family: "Hack", sans-serif;
}

.back-tag:hover {
  background-color: #373d41;
  color: #f6f5e7;
}

.blog_footer {
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.2rem;
  margin: 1rem 0;
}

@media screen and (max-width: 750px) {
  .classify {
    display: none;
  }
}
</style>
