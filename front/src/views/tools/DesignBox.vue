<template>
  <h3 v-if="title" class="disable-select" style="text-align: start">
    {{ title }}
  </h3>
  <div class="tools-container ghost-background">
    <ToolCard
      v-for="card in list"
      :key="card.url"
      :title="card.title"
      :info="card.info"
      :url="card.url"
      :icon="card.icon"
    />
  </div>
  <el-divider></el-divider>
</template>

<script>
import ToolCard from "../../components/ToolCard";

export default {
  name: "DesignBox",
  components: { ToolCard },
  props: {
    title: String,
    list: Array,
  },
};
</script>

<style scoped>
.tools-container {
  /*display: flex;*/
  /*justify-content: space-between;*/
  /*flex-wrap: wrap;*/
  /*align-content: space-around;*/
  /*background-color: #f5f5f5;*/

  /* 使用grid布局，为了最后一行元素左对齐 */
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 210px);
  grid-gap: 10px;
}
</style>
