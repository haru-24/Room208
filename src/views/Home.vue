<template>
  <div>
    <h1>Room208</h1>
    <!-- 1.1ルーム作成に必要な要素 -->
    ルーム名<input v-model="inputRoomName" />
    <button @click="addRoom">ルームを追加</button>
    <div v-for="room in rooms" :key="room.id">
      <router-link :to="{ path: /rooms/ + room.id }">{{
        room.data().roomName
      }}</router-link>

      <!-- 1.4削除ボタン追加 -->
      <button @click="deleteRoom(room)">削除</button>
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
    };
  },
  // 1.3 roomsデータ取得
  beforeCreate() {
    firebase
      .firestore()
      .collection("rooms")
      .onSnapshot((querySnapshot) => {
        this.rooms = [];
        querySnapshot.forEach((doc) => {
          this.rooms.push(doc);
        });
      });
  },
  methods: {
    addRoom() {
      //1.2 ルーム作成
      if (this.inputRoomName != "") {
        firebase.firestore().collection("rooms").add({
          roomName: this.inputRoomName,
        });
      } else {
        alert("ルームを作成できません");
      }
    },
    // 1.5ルームの削除
    deleteRoom(room) {
      const deleteConfirm = confirm("ルームを削除しますか？");
      if (deleteConfirm) {
        firebase.firestore().collection("rooms").doc(room.id).delete();
      }
    },
  },
};
</script>
