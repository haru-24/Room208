<template>
  <div class="register">
    <h1>新規登録</h1>
    <form class="login-form">
      <div class="input-group">
        <label for="user-name">ユーザーネーム</label>
        <input type="user-name" id="user-name" v-model="userName" />
      </div>
      <div class="input-group">
        <label for="email">メールアドレス</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="input-group">
        <label for="password">パスワード</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="input-group">
        <button type="button" @click="register">新規登録</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      userName: "",
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          console.log(result);
          firebase
            .firestore()
            .collection("users")
            .doc(result.user.uid)
            .set({
              userId: result.user.uid,
              email: result.user.email,
              userName: this.userName,
            })
            .then(() => {
              alert("アカウントを作成しました");
              this.$router.push("/login");
              this.userName = "";
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>
