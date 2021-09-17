import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import "./assets/app.css";
// import 'github-markdown-css';

// 预览组件以及样式
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
// 使用 github 主题
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";

// todo-list plugin
import createTodoListPlugin from "@kangc/v-md-editor/lib/plugins/todo-list/index";
import "@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css";
// line-number plugin
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";
// 快速复制代码块 plugin
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";

// highlightjs
import hljs from "highlight.js";

// 选择使用主题
VMdPreview
  .use(githubTheme, { Hljs: hljs })
  .use(createTodoListPlugin())
  .use(createLineNumbertPlugin())
  .use(createCopyCodePlugin());

createApp(App)
  .use(router)
  .use(ElementPlus)
  .use(VMdPreview)
  .mount("#app");
