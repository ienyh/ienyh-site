<template>
  <a class="collection-card" :href="url" target="_blank" title="点击进入">
    <span>
      <img class="icon-img" v-if="icon" :src="iconURL" />
    </span>
    <span class="title font-hack" style="margin-left: 5px"
      ><strong>{{ title }}</strong></span
    >
  </a>
</template>

<script>
export default {
  name: "collection-card",
  props: {
    title: String,
    url: String,
    icon: String,
  },
  data() {
    return {
      iconURL: "",
    };
  },
  created() {
    if (this.icon) {
      this.iconURL = this.icon.includes("/")
        ? this.icon
        : require(`../../../assets/icons/${this.icon}`);
    }
  },
};
</script>

<style scoped>
.collection-card {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
}

.collection-card:hover {
  box-shadow: 5px 5px 10px #c1c1c1, -5px -5px 10px #ffffff;
  transition: all 0.3s ease;
}

/* 文字样式 */
.title {
  padding: 0 6px;
}

/* 图标样式 */
.icon-img {
  display: block;
  height: 20px;
  /* object-fit: contain; 保持原有尺寸比例。长度和高度中短的那条边跟容器大小一致，长的那条等比缩放，可能会有留白。 */
  object-fit: contain;
  border-radius: 3px;
}
</style>
