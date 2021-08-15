<template>
  <div class="blog-list">
    <BlogCard 
      v-for="item in array" 
      :key="item.id"
      class="blog-card animated bounceInLeft" 
      :blogId="item.id" 
      :title="item.title" 
      :comments="item.comments"
      :path="item.path"
    />
  </div>
</template>

<script>
import BlogCard from "./components/BlogCard.vue";
import { markdownList } from "../../data/markdownList";

export default {
  name: "BlogList",
  components: {
    BlogCard,
  },
  data () {
    return {
      array: markdownList.map(item => {
        item.isVisiable = false;
        return item;
      }),
      blogCards: [],
    }
  },
  mounted () {
    this.initVis();

    const scrollHandler = () => {
      this.blogCards.forEach((item, index) => {
        const { top, bottom } = item.getBoundingClientRect();
        const isVisiable = bottom > 45 && top < document.documentElement.clientHeight;
        this.array[index].isVisiable = isVisiable;
      });
      // console.log(this.array);
      // if (this.array[this.array.length - 1].isVisiable) {
      //   // 当每张卡片的动画完成后，将滚动监听事件移除
      //   window.removeEventListener("scroll", scrollHandler);
      //   // 并且将添加动画的类名去掉，避免影响元素本身其他样式
      //   // 这里设置延迟执行，保证动画执行完成后才清除样式
      //   // setTimeout(() => { this.array.forEach(item => item.isVisiable = false) }, 1000);
      // }
    }
    window.addEventListener("scroll", scrollHandler);
  },
  methods: {
    initVis () {
      const blogCards = document.querySelectorAll(".blog_card");
      blogCards.forEach((item, index) => {
        const { top, bottom } = item.getBoundingClientRect();
        const isVisiable = bottom > 0 && top < document.documentElement.clientHeight;
        this.array[index].isVisiable = isVisiable;
      });
      this.blogCards = blogCards;
    }
  }
}
</script>

<style scoped>
.blog-list {
  width: 100%;
}

.blog-card {
  margin-bottom: 1rem;
}
</style>