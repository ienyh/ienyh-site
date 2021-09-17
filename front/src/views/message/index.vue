<template>
  <div class="container">
    <div class="time-line">
      <el-timeline>
        <el-timeline-item 
          v-for="comment in comments" 
          :key="comment.message"
          :timestamp="comment.time ?? ''" 
          placement="top"
        >
          <el-card>
            <h4 v-if="comment.title">
              <el-avatar size="small" :src="comment.avatar"></el-avatar>
              <span style="margin-left: 1rem">{{ comment.title }}</span>
            </h4>
            <p>{{ comment.message }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>

    <div class="comments">
      <label for="comments" style="margin: 0 0 0.8rem 0;">给我留言 😊</label>
      <!-- <textarea name="comments" id="comments" v-model="leftMessage"></textarea> -->
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="leftMessage">
      </el-input>
      <div class="bottom-container">
        <div class="avatar-container">
          <input class="select" type="radio" v-model="avatar" value="boy" id="male" checked>
          <label for="male">
            <img src="../../assets/svg/avatar_boy.svg" />
          </label>
          <input class="select" type="radio" v-model="avatar" value="girl" id="female">
          <label for="female">
            <img src="../../assets/svg/avatar_girl.svg" />
          </label>
          <input class="input" type="text" v-model="leftName" placeholder="留个名儿吧 😊">
        </div>
        <div class="btn-container">
          <button @click="cancel">清空</button>
          <button @click="define">留言</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime, randomInt } from '../../utils/common';
import { ElMessage } from 'element-plus'; 

export default {
  data () {
    return {
      leftName: '',
      leftMessage: '',
      avatar: 'boy',
      commentList: [],
    }
  },
  computed: {
    comments: {
      get () {
        return this.commentList.length > 0 ? this.commentList : [{ message: "给我留言吧！", time: formatTime() }]
      }
    }
  },
  methods: {
    cancel () {
      this.leftMessage = '';
      this.leftName = '';
      this.avatar = 'boy';
    },
    define () {
      // console.log(this.avatar);
      if (this.leftMessage.trim() !== '') {
        this.commentList.unshift({
          message: this.leftMessage.trim(),
          time: formatTime(new Date()),
          title: this.leftName || `某位不愿意透露姓名的${'蒜头王八'}`,
          avatar: require(`../../assets/svg/avatar_${this.avatar}.svg`),
        });
        this.leftMessage = "";
        this.leftName = '';
      } else {
        ElMessage.warning({
          message: "请输入",
          showClose: true,
        });
      }
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-evenly;
  align-items: start;
  padding: 5.5rem 0 0 0;
  min-height: 80vh;
}

img {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}

.time-line {
  flex: 1;
  padding: 2rem 4rem;
}

h4 {
  display: flex;
  justify-content: start;
  align-items: center;
}


.comments {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  padding: 2rem;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 1rem 1rem 0;
}

.textarea {
  border-radius: 6px;
  overflow: hidden;
  padding: 4px 6px;
  margin: 1rem 0 0 0;
  font-family: 'HarmonyOS_Sans_Regular', Verdana, Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100px;
  resize: vertical;
}

.bottom-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 1rem 0 0;
}

.avatar-container {
  display: flex;
  justify-content: start;
  align-items: center;
}

.input {
  height: 30px;
  margin: 2px 1rem;
  padding: 0px 4px;
}

.select {
  margin-right: 4px;
}

.btn-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: .4rem;
}

.btn-container button {
  margin: 2px 6px;
  padding: 2px 6px;
  letter-spacing: 4px;
}

@media screen and (min-width: 750px) {
  .container {
    display: flex;
    justify-content: space-evenly;
    align-items: start;
    padding: 5.5rem 0 0 0;
    min-height: 80vh;
  }
}

@media screen and (max-width: 749px) {
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5.5rem 0 0 0;
    min-height: 80vh;
  }

  .time-line {
    padding: 1rem 1rem;
    width: 100%;
  }

  .comments {
    width: 100%;
    background-color: #fff;
    height: unset;
  }

  .comments .bottom-container {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
  }
}
</style>