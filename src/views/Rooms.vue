<template>
  <div>
    <!-- 2.1チャット文の挿入 -->
    <div>
      <h3>USER:{{ loginUserName }}</h3>
    </div>
    <div>
      <label for="comment">COMMENT：</label>
      <textarea v-model="inputPostContent"></textarea>
      <br />
      <button @click="addContent">送信</button>
    </div>
    <hr />
    <!-- 2.4HTMLにfirebaseのデータを書き出す -->
    <div v-for="(content, index) in contents" :key="index">
      <span>{{ content.data().createdAt }}</span>
      <span class="mrl-20">USER:{{ content.data().userName }}</span>
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

      inputPostContent: "",
      contents: [],
      loginUserName: "",
    };
  },
  // 2.3contentを呼び出す
  created() {
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
    // ログイン機能 uidをもとにデータベースからユーザー情報を取得
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      console.log("ログインしてるよ");
    } else {
      console.log("ログインしてないよ");
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("login");
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then((snapshot) => {
            console.log(snapshot.data().userName);
            this.userName = snapshot.data().userName;
          });
      } else {
        console.log("logout");
      }
    });
  },

  methods: {
    // 2.2チャットデータを追加
    addContent() {
      if (this.inputPostContent != "") {
        firebase
          .firestore()
          .collection("rooms")
          .doc(this.$route.params.roomId)
          .collection("content")
          .add({
            // ログイン時のuserName("users")を"content"の中にもう一度入れている
            userName: this.loginUserName,
            content: this.inputPostContent,
            // 2.5 書き込み時間の追加
            createdAt: `${new Date().getFullYear()}/${
              new Date().getMonth() + 1
            }/${new Date().getDate()}/${new Date().getHours()}:${new Date().getMinutes()}`,
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
  height: 20px;
  width: 300px;
}
</style>
