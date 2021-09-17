<template>
  <div class="container">
    <div class="input-container">
      <input id="file-input" name="file-input" type="file" accept=".md" class="file-input" />
      <div class="inner">
        <label for="file-input">上传 markdown 文件</label>
      </div>
      <button @click="clean">清除</button>
      <!-- <button @click="addHandler">确认添加</button> -->
    </div>

    <div class="markdown">
      <div class="input-bar">
        <el-input v-model="blog.title" placeholder="请输入标题" size="small" class="el-input"></el-input>
        <el-input v-model="blog.author" placeholder="请输入作者" size="small" class="el-input"></el-input>
        <el-button type="primary" size="small" @click="addHandler">确认添加</el-button>
        <span style="margin-left: 1rem">字数: {{ blog.numbers || 0 }}</span>
      </div>
      <div class="content" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
import markdownToHtml from "../../utils/markdown.js";
import { ElMessage } from 'element-plus'; 
import { addBlog } from '../../apis/blogApis';

export default {
  name: "manage",
  data () {
    return {
      isUpload: false,
      blog: {
        title: '',
        content: '',
        author: '',
        desc: '',
        create_time: '',
        numbers: null,
      }
    }
  },
  mounted () {
    const _this = this;
    document
      .querySelector("#file-input")
      .addEventListener("change", function () {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", () => {
          _this.blog.numbers = fileReader.result?.length ?? 0;
          _this.blog.content = markdownToHtml(fileReader.result);
          ElMessage.success({
            message: "上传成功",
            showClose: true,
          });
        });
        fileReader.readAsText(this.files[0]);
        this.isUpload = true; // 状态设为已上传
      });
  },
  methods: {
    clean () {
      this.blog = {};
    },

    async addHandler () {
      const res = await addBlog(this.blog);
      if (res?.code === 1) {
        ElMessage.success({
          message: "添加成功",
          showClose: true,
        });
        this.clean();
      } else {
        ElMessage.error({
          message: "添加失败",
          showClose: true,
        });
      }
    },

    getMDCount (str) {
      //先将回车换行符做特殊处理
   		// eslint-disable-next-line no-mixed-spaces-and-tabs
   		// str = str.replace(/(\r\n+|\s+)/g,"龘");
      // //处理英文字符数字，连续字母、数字、英文符号视为一个单词
      // // eslint-disable-next-line no-control-regex
      // str = str.replace(/[\x00-\xff]/g,"m");	
      // //合并字符m，连续字母、数字、英文符号视为一个单词
      // str = str.replace(/m+/g,"*");
      //   //去掉回车换行符
      // str = str.replace(/龘+/g,"");
      // //返回字数
      // return str.length;
    }
  }
};
</script>

<style src="../../assets/github.css" scoped></style>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 5.5rem 1rem 0;
  min-height: 80vh;
}

.input-container {
  display: flex;
  justify-content: start;
  align-items: center;    
}

.file-input {
  position: absolute;
  display: none;
}

.input-container .inner {
  display: block;
  background: #fff;
  border-radius: 4px;
  padding: .4rem 1rem;
  font-size: 1.4rem;
  margin: 0 4px;
}

.input-container button {
  padding: .4rem 1rem;
  font-size: 1.4rem;
  border: none;
  background: #fff;
  border-radius: 4px;
  margin: 0 4px;
}

.markdown {
  margin: 1rem 2rem 0;
  width: 100%;
  /* min-height: 500px; */
  background: #fff;
  border-radius: 1rem;
  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;;
  align-items: start;
}

.markdown .input-bar {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  padding: 0 2px 1rem;
  border-bottom: #737373 solid 1px;
}

.markdown .input-bar .el-input {
  margin-right: 1rem;
  width: 12rem;
}

.markdown .content {
  min-height: 3rem;
  margin: 1rem 2rem;
}
</style>
