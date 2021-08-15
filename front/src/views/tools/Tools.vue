<template>
  <div class="tools-container ">
    <!-- 收藏站点 -->
    <div class="collection-site">
      <div class="collection-box">
        <collection-card
          v-for="collection in collections"
          :key="collection.url"
          :title="collection.title"
          :url="collection.url"
          :icon="collection.icon"
        />
      </div>
    </div>

    <el-tabs type="border-card" class="tabs-container">
      <el-tab-pane label="前端">
        <DesignBox
          v-for="list in front"
          :key="list.id"
          :list="list.data"
          :title="list.title"
        />
      </el-tab-pane>
      <el-tab-pane label="后端">
        <DesignBox
          v-for="list in back"
          :key="list.id"
          :list="list.data"
          :title="list.title"
        />
      </el-tab-pane>
      <el-tab-pane label="通用工具">
        <DesignBox :list="tools" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import DesignBox from "./DesignBox";
import tools from "../../data/tools/tools";
import {
  apiDocuments as frontApiDocument,
  frameworks as frontFramework,
  library as frontLibrary,
  resource as frontResource,
} from "../../data/tools/front";
import {
  framework as backFramework,
  library as backLibrary,
} from "../../data/tools/back";
import CollectionCard from "./components/collection-card";
import collections from "../../data/collection";

import { queryCardMessage } from "../../apis/cardApis";

export default {
  name: "Tools",
  components: { CollectionCard, DesignBox },
  data() {
    return {
      collections: collections,
      tools: tools,
      front: [
        { id: "apiDocuments", title: "Document", data: frontApiDocument },
        { id: "frontFramework", title: "Framework", data: frontFramework },
        { id: "frontLibrary", title: "Library", data: frontLibrary },
        { id: "frontResource", title: "Resource", data: frontResource },
      ],
      back: [
        { id: "backFramework", title: "Framework", data: backFramework },
        { id: "backLibrary", title: "Library", data: backLibrary },
      ],
      searchContent: "",
    };
  },
  methods: {
    search() {
      console.log(this.searchContent);
      queryCardMessage(this.searchContent)
        .then(result => {
          console.log(result);
          if (Array.isArray(result.data) && result.data.length > 0) {
            ElMessage.success("查询成功");
          } else {
            ElMessage.warning("未查询到数据");
          }
        })
        .catch(console.log);
    },
  },
};
</script>

<style scoped>
.tools-container {
  padding: 5.5rem 1rem 1rem 1rem;
}

.tabs-container {
  width: 85%;
  margin: 2rem auto;
  background-color: #f5f5f5;
  border-radius: 2px 2px 8px 8px;
}

/* 收藏外容器属性 */
.collection-site {
  width: 85%;
  margin: 0 auto;
  background: linear-gradient(to right bottom, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.2));
  backdrop-filter: blur(0.8rem);
  box-shadow: 1rem 1rem 2rem rgba(0, 0, 0, 0.2);
  border-radius: .8rem;
  padding: .4rem 0;
}

/* 收藏内容器属性 */
.collection-box {
  margin: 1rem 8rem;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 17rem);
  grid-gap: .5rem;
}
</style>
