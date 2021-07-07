<template>
  <el-page-header
      class="font-monaco disable-select"
      @back="() => $router.go(-1)"
  >
    <template #title>
      <el-tag class="font-size-small back-tag" type="info">back</el-tag>
    </template>
    <template #content>
      <el-tag class="font-size-small" type="info">ienyh</el-tag>
      <el-divider direction="vertical"></el-divider>
      <el-tag class="font-size-small" type="info">Javascript</el-tag>
      <el-divider direction="vertical"></el-divider>
      <el-tag class="font-size-small" type="info">{{ new Date().toLocaleDateString() }}</el-tag>
    </template>
  </el-page-header>

  <div class="blog_container font-hack">
    <h1>title id: {{ $route.params.id }}</h1>
    <p v-html="markdown"></p>
    <p>测试数据</p>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";

export default {
  name: "Blog",
  // eslint-disable-next-line no-unused-vars
  // beforeRouteEnter: (to, from, next) => {},
  data () {
    return {
      htmlValue: "<h4>hello world</h4>",
      initialValue: `
      # biaoti-1
      ## biaoti-2
      ### biaoti-3
      #### biaoti-4
      `
    }
  },
  computed: {
    markdown: {
      get () {
        const md = new MarkdownIt();
        return md.render(this.initialValue);
      }
    }
  },
  created () {
    // 请求数据
  },
}
</script>

<style scoped>
.blog_container {
  display: block;
  margin-top: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
}

.back-tag:hover {
  background-color: #000;
  color: #F6F5E7;
}
</style>