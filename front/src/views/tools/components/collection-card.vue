<template>
  <a class="collection-card" :href="url" target="_blank" title="点击进入">
    <span>
      <img v-if="icon" class="icon-img" :src="iconURL" />
      <img v-else class="icon-img" src="../../../assets/icons/none.svg">
    </span>
    <span class="title font-size-small" style="margin-left: 5px">{{
      title
    }}</span>
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
  padding: .4rem;
  border-radius: .4rem;
  transition: all 0.25s ease-in;
}

.collection-card:hover {
  box-shadow: .4rem .4rem .4rem #c1c1c1, .4rem .4rem .4rem #f1f1f1;
  transition: all 0.3s ease;
  transform: translateY(-0.2rem);
}

/* 文字样式 */
.title {
  padding: 0 0.6rem;
}

/* 图标样式 */
.icon-img {
  display: block;
  height: 2rem;
  /* object-fit: contain; 保持原有尺寸比例。长度和高度中短的那条边跟容器大小一致，长的那条等比缩放，可能会有留白。 */
  object-fit: contain;
  border-radius: .3rem;
}
</style>
