<template>
  <div class="blog-list">
    <el-space direction="vertical" size="large">
      <div v-for="item in array" :key="item.id">
        <BlogCard :id="item.id" :title="item.title" :content="item.content" />
      </div>
    </el-space>
  </div>
</template>

<script>
import BlogCard from "../../components/BlogCard";

export default {
  name: "BlogList",
  components: {
    BlogCard,
  },
  data () {
    return {
      array: [
        { title: "title1", id: "title1" },
        { title: "title2", id: "title2" },
        { title: "title3", id: "title3" },
        { title: "title4", id: "title4" },
        { title: "title5", id: "title5" },
        { title: "title6", id: "title6" },
        { title: "title7", id: "title7", content: "最重要其实是，要明白这三个函数的存在意义是什么？" },
      ],
    }
  }
}
</script>

<style scoped>
.blog-list {
  width: 100%;
}
</style>