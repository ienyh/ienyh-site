<template>
  <div class="blog-list">
    <BlogCard 
      v-for="item in blogs" 
      :key="item.id"
      class="blog-card animated bounceInLeft" 
      :title="item.title" 
      :comments="item.desc"
      :time="item.create_time"
      :author="item.author"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import BlogCard from "./components/BlogCard.vue";
import { getBlogs } from '../../apis/blogApis.js';

export default {
  name: "BlogList",
  components: {
    BlogCard,
  },
  data () {
    return {
      blogCards: [],
      blogs: [],
    }
  },
  async mounted () {
    const { data } = await getBlogs();
    this.blogs = data
      .sort((a, b) => new Date(b.create_time).getTime() - new Date(a.create_time).getTime())
      .map((item) => {
      const { title, content, desc, author, create_time, update_time, numbers } = item;
      return {
        title, 
        content, 
        desc, 
        author,
        numbers,
        create_time: dayjs(new Date(create_time)).format('YYYY-MM-DD'),
        update_time: dayjs(new Date(update_time)).format('YYYY-MM-DD'),
      }
    });

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
    // window.addEventListener("scroll", scrollHandler);
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
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>