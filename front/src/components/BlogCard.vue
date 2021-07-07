<template>
  <div class="blog_card font-monaco">
    <div style="display: flex; justify-content: space-between">
      <router-link :to="'/note/title/:' + id || 'title-temp'">
        <h3 class="title">
          <strong>
            {{ title }} id: {{ id || "title-temp" }}
          </strong>
        </h3>
      </router-link>
      <el-tag class="blog_tag" type="info">{{ time || (new Date()).toLocaleDateString() }}</el-tag>
    </div>
    <div class="blog_data">
      <span class="blog_tag">
        <svg t="1625219206766" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3828" width="16" height="16"><path d="M789.504 890.368H319.488c-18.432 0-33.28 14.848-33.28 33.28s14.848 33.28 33.28 33.28h470.016c18.432 0 33.28-14.848 33.28-33.28s-14.848-33.28-33.28-33.28z" fill="#FA7268" p-id="3829"></path><path d="M731.648 392.192c68.096-118.272 79.36-283.136 79.872-289.792 1.024-12.288-5.632-24.576-16.384-30.72-10.752-6.144-24.064-6.144-34.816 0.512-24.576 15.872-241.152 156.16-287.744 235.52-68.096 114.688-235.52 420.864-237.056 423.936-1.536 2.56-2.048 5.12-3.072 7.68l-91.648 158.72c-9.216 15.872-3.584 36.352 12.288 45.568 5.12 3.072 10.752 4.608 16.384 4.608 11.264 0 22.528-6.144 28.672-16.896L291.84 769.536c58.368-39.936 371.2-258.048 439.808-377.344z m-201.728-51.2c23.04-39.424 122.368-115.2 206.336-173.056-9.216 54.272-27.648 130.56-61.952 190.976-39.936 68.608-190.976 189.952-310.272 278.016 54.272-98.816 126.464-229.376 165.888-295.936z" fill="#3E3A39" p-id="3830"></path></svg>
        {{ author || "ienyh" }}</span>
      <el-divider direction="vertical"></el-divider>
      <span class="vertical-align: center">分类专栏：{{ classification || "Javascript" }}</span>
    </div>
    <p>{{ content || temp }}</p>
    <div class="title" style="text-align: end">
      <router-link :to="'/note/title/:' + title" class="title">查看全文</router-link>
      <span><i class="el-icon-right"></i></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogCard",
  props: {
    id: String,
    title: String,
    content: String,
    time: String,
    author: String,
    classification: String,
  },
  data () {
    return {
      temp: "最重要其实是，要明白这三个函数的存在意义是什么？答案是改变函数执行时的上下文，再具体一点就是改变函数运行时的 this 指向。call() 和 apply() 改变了函数的 this 上下文后执行该函数，而 bind() 则是返回改变了上下文后的一个函数。",
    }
  }
}
</script>

<style scoped>
.blog_card {
  display: block;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
}

.blog_card:hover {
  box-shadow:  8px 8px 0px #cccccc, -8px -8px 0px #F2F2F2;
  transition: all 0.5s ease;
}

.title {
  color: #c04851;
}

.blog_data {
  display: flex;
  justify-content: start;
  padding: 2px 0;
  margin: 0 0 5px 0;
  opacity: 0.8;
}

.blog_data .blog_tag {

}
</style>