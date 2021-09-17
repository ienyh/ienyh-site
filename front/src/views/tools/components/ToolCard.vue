<template>
  <div class="card-container disable-select" :title="info">
    <a :href="url" target="_blank">
      <div class="card-up font-size-smaller">
        <span>
          <span
            style="border-radius: 2px; background-color: #f5f5f5; padding: 1px 3px;"
          >
            {{ title }}
          </span>
        </span>
        <span>
          <img v-if="icon" class="icon-img" :src="imgURL" />
          <img v-else class="icon-img" src="../../../assets/icons/none.svg" />
        </span>
      </div>
      <!-- <hr style="margin: 0 auto; width: 95%" /> -->
      <div class="card-down">
        <span class="hidden font-size-smaller">{{ info }}</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "ToolCard",
  props: {
    title: String,
    info: String,
    url: String,
    icon: String,
  },
  data() {
    return {
      imgURL: this.icon
        ? this.icon.includes("/")
          ? this.icon
          : require(`../../../assets/icons/${this.icon}`)
        : "",
    };
  },
};
</script>

<style scoped>
/* 卡片容器样式 */
.card-container {
  display: block;
  width: 21rem;
  height: 10rem;
  margin: 1rem 0;
  padding: .2rem;
  border-radius: 0.6rem;
  background-color: #fff;
  overflow: hidden;
  transition: all 0.25s ease-in;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-container:hover {
  border-radius: 6px;
  /* box-shadow: 8px 8px 3px #929292, -8px -8px 3px #ffffff; */
  transition: all 0.3s ease;
  transform: scale(1.1) translateY(-5px) ;
}

/* 卡片上部样式 */
.card-up {
  padding: 0.6rem;
  background: #ffffff;
  color: #000;
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 0.6rem;
  border-top-right-radius: 0.6rem;
  border-bottom: solid 1px #737373;
}

/* 卡片上部右侧图标样式 */
.card-up .icon-img {
  border-radius: 1px;
  display: block;
  height: 20px;
  object-fit: contain;
}

/* 卡片下部样式 */
.card-down {
  padding: 6px;
}

/* 卡片下部设置文字超过三行后显示省略号... */
.card-down .hidden {
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
