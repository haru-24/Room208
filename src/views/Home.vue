<template>
  <div>
    <div class="header-bgcolor"></div>
    <div class="header">
      <h1 class="title">Room208</h1>
      <button class="logout" @click="logout">ログアウト</button>
      <p>{{ this.message }}</p>
    </div>

    <!-- 1.1ルーム作成に必要な要素 -->
    <div class="room-name-conteiner">
      <label for="room-create" class="room-create">ルームを作成</label>
      <input
        v-model="inputRoomName"
        @keypress.enter="addRoom"
        class="room-name-input"
      />
      <button @click="addRoom" class="room-add-btn">+</button>
    </div>
    <hr class="boder" />

    <div v-for="room in rooms" :key="room.id" class="room-conteiner">
      <router-link :to="{ path: /rooms/ + room.id }" class="room-name">{{
        room.data().roomName
      }}</router-link>

      <!-- 1.4削除ボタン追加 -->
      <button @click="deleteRoom(room)" class="delete-btn">−</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

export default {
  props: {
    message: String,
  },

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

<style scoped>
* {
  margin: 0px;
}
.header {
  display: flex;
  width: 100%;
  height: 120px;
  background: rgba(84, 169, 196, 0.86);
  align-items: center;
}
.title {
  width: 306px;
  height: 81px;
  margin-left: 30px;
  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 64px;
  line-height: 87px;

  color: rgba(77, 80, 76, 0.9);
}

.logout {
  width: 200px;
  height: 80px;
  margin-left: auto;
  margin-right: 20px;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  display: inline-block;
  background-color: rgba(84, 169, 196, 0.3);

  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 33px;

  color: rgba(77, 80, 76, 0.9);
}
.logout:hover {
  box-shadow: 0 0 45px rgba(255, 255, 255, 0.3) inset;
}
.logout:active {
  transform: translate(0, 2px);
}
.room-name-conteiner {
  position: relative;
  display: inline-block;
  text-align: center;
  height: 70px;
  border-bottom: black solid 2px;
}
.room-create {
  margin-left: 20px;
  position: absolute;
  width: 200px;
  height: 55px;
  top: 10px;

  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  line-height: 66px;

  color: rgba(77, 80, 76, 0.9);
}
.room-name-input {
  position: absolute;
  top: 25px;

  width: 300px;
  height: 30px;
  left: 270px;

  background: #ffffff;
  mix-blend-mode: normal;
  border: 1px solid #000000;
  box-sizing: border-box;
}
.room-add-btn {
  position: absolute;
  width: 35px;
  height: 35px;
  border-radius: 100%;
  left: 580px;
  top: 22px;

  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 20px;

  border: 1px solid white;

  color: #ffffff;
  background: #6cb5cc;
}
.room-add-btn:hover {
  background-color: #64d3f5;
}
.boder {
  border-bottom: solid 2px black;
}
.room-conteiner {
  position: relative;
  width: 100%;
  height: 50px;
  border-bottom: black solid 2px;
  display: inline-block;
}
.room-name {
  position: absolute;
  top: 3px;
  left: 30px;
  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 25px;
  line-height: 49px;

  color: rgba(77, 80, 76, 0.9);
}
.room-name::before {
  transform: scaleX(0);
  transform-origin: bottom right;
}
.room-name:hover::before {
  transform: scaleX(1);
  transform-origin: bottom left;
}
.room-name::before {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  inset: 0 0 0 0;
  background: rgba(84, 169, 196, 0.86);
  z-index: -1;
  transition: transform 0.3s ease;
}

.delete-btn {
  margin-top: 8px;
  margin-right: 20px;
  float: right;
  width: 35px;
  height: 35px;
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
  margin-left: 30px;
}
.delete-btn:hover {
  background-color: #64d3f5;
}
</style>
