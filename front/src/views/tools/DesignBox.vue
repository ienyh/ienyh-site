<template>
  <div>
    <div style="display: flex; justify-content: start; align-items: center">
      <h4 class="disable-select">
        {{ title || "Tools" }}
      </h4>
    </div>
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
  </div>
</template>

<script>
import ToolCard from "./components/ToolCard.vue";

export default {
  name: "DesignBox",
  components: { ToolCard },
  props: {
    title: String,
    list: Array,
  },
  data() {
    return {
      dialogFormVisible: false,
      form: {
        url: "",
        icon: "",
        title: "",
        info: "",
      },
    };
  },
  methods: {
    async commitForm () {
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style scoped>
.tools-container {
  /* 使用grid布局，为了最后一行元素左对齐 */
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 21rem);
  grid-gap: 1rem;
}
</style>
