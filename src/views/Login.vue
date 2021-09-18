<template>
  <div class="login">
    <h1>ログイン</h1>
    <form class="login-form">
      <div class="input-group">
        <label for="email">メールアドレス</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="input-group">
        <label for="password">パスワード</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="input-group">
        <button type="button" @click="login">ログイン</button>
      </div>
    </form>
    <router-link to="/login/rigister">新規登録</router-link>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          return firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then((userCredential) => {
              this.$router.push("/home");
              console.log(userCredential.user.uid);
            })
            .catch((error) => {
              alert(error.message);
            });
        });
    },
  },
};
</script>

<style>
.input-group {
  margin: 5px;
}
</style>
