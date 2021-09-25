<template>
  <div>
    <div class="header-bgcolor"></div>
    <div class="header">
      <router-link to="/home" class="back-page"></router-link>

      <h1 class="room-name">{{ roomName }}</h1>
    </div>

    <!-- 2.1チャット文の挿入 -->
    <div class="add-content-conteiner">
      <label for="user-name" class="user-name">ユーザーネーム </label>
      <p class="login-name">{{ loginUserName }}</p>
      <input
        class="input-text"
        v-model="inputPostContent"
        @keypress.enter="addContent"
      />
      <button @click="addContent" class="add-btn">+</button>
    </div>

    <!-- 2.4HTMLにfirebaseのデータを書き出す -->
    <div
      v-for="(content, index) in contents"
      :key="index"
      class="content-conteiner"
    >
      <div class="user-data">
        <p class="content-user-name">{{ content.data().userName }}</p>
        <p class="content-at">{{ content.data().createdAt }}</p>
        <button @click="deleteContent(content)" class="delete-btn">-</button>
      </div>
      <div class="message-conteiner">
        <span class="content">{{ content.data().content }}</span>
      </div>
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
      roomName: "",
    };
  },
  // 2.3contentを呼び出す

  created() {
    this.createContent();
    this.createRoomName();

    // ログイン機能 uidをもとにデータベースからユーザー情報を取得
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then((snapshot) => {
            this.loginUserName = snapshot.data().userName;
          });
      } else {
        console.log("logout");
        this.$router.push("/login");
      }
    });
  },

  methods: {
    createContent() {
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
    createRoomName() {
      firebase
        .firestore()
        .collection("rooms")
        .doc(this.$route.params.roomId)
        .get()
        .then((querySnapshot) => {
          this.roomName = querySnapshot.data().roomName;
        });
    },
  },
};
</script>

<style scoped>
.header {
  position: relative;
  display: flex;
  width: 100%;
  height: 120px;
  background: rgba(84, 169, 196, 0.86);
  align-items: center;
}
.room-name {
  width: 100%;
  height: 81px;
  text-align: center;
  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 50px;
  line-height: 87px;

  color: rgba(77, 80, 76, 0.9);
}
.back-page {
  position: relative;
  left: 30px;
  width: 30px;
  height: 30px;
  border: 5px solid;
  border-color: transparent transparent whitesmoke whitesmoke;
  transform: rotate(45deg);
}
.add-content-conteiner {
  position: relative;
  top: 30px;
  left: 0px;
  display: block;
}
.user-name {
  position: absolute;
  width: 170px;
  height: 35px;
  left: 14px;
  top: 24px;

  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 33px;

  color: rgba(77, 80, 76, 0.9);
}
.login-name {
  position: absolute;

  height: 35px;
  left: 235px;

  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 33px;

  color: #6cb5cc;
}
.input-text {
  position: absolute;
  width: 300px;
  height: 25px;
  left: 14px;
  top: 60px;

  background: #ffffff;
  mix-blend-mode: normal;
  border: 1px solid #000000;
  box-sizing: border-box;
}
.add-btn {
  position: absolute;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  left: 330px;
  top: 56px;

  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 20px;

  border: 1px solid white;

  color: #ffffff;
  background: #6cb5cc;
}
.add-btn:hover {
  background-color: #64d3f5;
}
.content-conteiner {
  position: relative;
  top: 170px;
  display: block;
  width: 100%;
  height: 130px;
}
.user-data {
  position: absolute;
  display: flex;
  width: 100%;
}
.content-user-name {
  height: 35px;

  margin-left: 10px;

  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 33px;

  color: #6cb5cc;
}

.content-at {
  width: 200px;
  height: 35px;
  margin-left: 20px;
  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 33px;

  color: rgba(77, 80, 76, 0.9);
}
.delete-btn {
  margin-top: 25px;

  width: 30px;
  height: 30px;
  border-radius: 100%;

  font-family: Avenir;
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  text-align: center;
  line-height: 20px;

  border: 1px solid white;

  color: #ffffff;
  background: #6cb5cc;
}
.message-conteiner {
  position: absolute;
  top: 60px;
  left: 20px;

  display: flex;
}
.content {
  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 49px;
  /* identical to box height */

  color: rgba(77, 80, 76, 0.9);
}
</style>
