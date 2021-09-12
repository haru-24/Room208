<template>
  <div>
    <!-- 2.1チャット文の挿入 -->
    <div>
      USER：<input v-model="inputUserName" />
      <p></p>
      COMMENT：<textarea v-model="inputPostContent"></textarea>
      <br />
      <button @click="addContent">送信</button>
    </div>
    <hr />
    <!-- 2.4HTMLにfirebaseのデータを書き出す -->
    <div v-for="(content, index) in contents" :key="index">
      USER:<span>{{ content.data().userName }}</span>
      <span class="mrl-20">{{ content.data().content }}</span>
      <button @click="deleteContent(content)">削除</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

export default {
  name: "Rooms",
  props: ["roomId"],
  data() {
    return {
      // 2.0入力データを格納
      inputUserName: "",
      inputPostContent: "",
      contents: [],
    };
  },
  // 2.3contentを呼び出す
  beforeCreate() {
    firebase
      .firestore()
      .collection("rooms")
      .doc(this.$route.params.roomId)
      .collection("content")
      .onSnapshot((querySnapshot) => {
        this.contents = [];
        querySnapshot.forEach((doc) => {
          this.contents.push(doc);
        });
      });
  },
  methods: {
    // 2.2チャットデータを追加
    addContent() {
      if (this.inputPostContent != "" || this.inputUserName != "") {
        firebase
          .firestore()
          .collection("rooms")
          .doc(this.$route.params.roomId)
          .collection("content")
          .add({
            userName: this.inputUserName,
            content: this.inputPostContent,
          });
        this.inputPostContent = "";
      } else {
        alert("投稿できません");
      }
    },
    deleteContent(content) {
      const deleteConfirm = confirm("コメントを削除しますか？");
      if (deleteConfirm) {
        firebase
          .firestore()
          .collection("rooms")
          .doc(this.$route.params.roomId)
          .collection("content")
          .doc(content.id)
          .delete();
      }
    },
  },
};
</script>

<style scoped>
.mrl-20 {
  margin-left: 20px;
}
textarea {
  resize: none;
  height: 50px;
  width: 300px;
}
</style>
