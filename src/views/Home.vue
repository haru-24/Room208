<template>
  <div>
    <h1>Home</h1>
    <h2>こんにちは、{{ userName }}さん</h2>
    <!-- 1.1ルーム作成に必要な要素 -->
    ルーム名<input v-model="inputRoomName" @keypress.enter="addRoom" />
    <button @click="addRoom">ルームを追加</button>
    <div v-for="room in rooms" :key="room.id">
      <router-link :to="{ path: /rooms/ + room.id }">{{
        room.data().roomName
      }}</router-link>

      <!-- 1.4削除ボタン追加 -->
      <button @click="deleteRoom(room)">削除</button>
    </div>
    <div>
      <button class="logout" @click="logout">ログアウト</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

export default {
  name: "home",

  data() {
    return {
      // 1.0ルーム名格納
      inputRoomName: "",
      rooms: "",
      userName: "",
    };
  },

  // 1.3 roomsデータ取得
  created() {
    this.createRoom(), this.createLoginUser();
  },

  methods: {
    createRoom() {
      firebase
        .firestore()
        .collection("rooms")
        .where("isDeleted", "==", false)
        .onSnapshot((querySnapshot) => {
          this.rooms = [];
          querySnapshot.forEach((doc) => {
            this.rooms.push(doc);
          });
        });
    },
    // ログイン機能 uidをもとにデータベースからユーザー情報を取得
    createLoginUser() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
              this.userName = snapshot.data().userName;
            });
        }
      });
    },
    addRoom() {
      //1.2 ルーム作成
      if (this.inputRoomName != "") {
        firebase.firestore().collection("rooms").add({
          roomName: this.inputRoomName,
          isDeleted: false,
        });
      } else {
        alert("ルームを作成できません");
      }
      this.inputRoomName = "";
    },
    // 1.5ルームの削除
    deleteRoom(room) {
      const deleteConfirm = confirm("ルームを削除しますか？");
      if (deleteConfirm) {
        firebase.firestore().collection("rooms").doc(room.id).update({
          isDeleted: true,
        });
      }
    },
    // ログアウト
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          console.log(error);
          // An error happened.
        });
    },
  },
};
</script>

<style>
.logout {
  position: absolute;
  top: 10px;
  right: 30px;
}
</style>
