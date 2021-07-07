<template>
  <div class="font-monaco tools-container ">

    <!-- 收藏站点 -->
    <div class="collection-site">
<!--      <h3 class="font-sans-serif" style="text-align: start; margin: 5px 0 0 20px;">收藏站点</h3>-->
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
        <DesignBox :list="tools"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DesignBox from "./DesignBox";
import tools from "../../data/tools/tools";
import {
  apiDocuments as frontApiDocument,
  frameworks as frontFramework,
  library as frontLibrary,
  resource as frontResource,
} from "../../data/tools/front";
import { framework as backFramework, library as backLibrary } from "../../data/tools/back";
import CollectionCard from "./components/collection-card";
import collections from "../../data/collection";

export default {
  name: "Tools",
  components: {CollectionCard, DesignBox },
  data () {
    return {
      collections: collections,
      tools: tools,
      front: [
        { id: "apiDocuments", title: "apiDocuments", data: frontApiDocument },
        { id: "frontFramework", title: "Framework", data: frontFramework },
        { id: "frontLibrary", title: "Library", data: frontLibrary },
        { id: "frontResource", title: "Resource", data: frontResource },
      ],
      back: [
        { id: "backFramework", title: "Framework", data: backFramework },
        { id: "backLibrary", title: "Library", data: backLibrary }
      ],
    }
  }
}
</script>

<style scoped>
.tools-container {
  background-color: #f5f5f5;
  padding: 10px;
}

.tabs-container {
  width: 85%;
  margin: 20px auto;
  background-color: #f5f5f5;
  border-radius: 2px 2px 8px 8px;
  box-shadow: 8px 8px 5px #929292, -8px -8px 8px #ffffff;
}


/* 收藏外容器属性 */
.collection-site {
  width: 85%;
  margin: 0 auto;
  background-color: #e8e8e8;
  border-radius: 8px;
  padding: 4px 0;
  box-shadow:  8px 8px 8px #929292,  -8px -8px 8px #ffffff;
}

/* 收藏内容器属性 */
.collection-box {
  margin: 10px 80px;
  display: grid;
  justify-content: space-between;
  grid-template-columns: repeat(auto-fill, 170px);
  grid-gap: 5px;
}
</style>