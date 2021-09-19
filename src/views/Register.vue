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
        <br />
        <p class="color-red">{{ errorMessage }}</p>
        <router-link to="/login/">ログイン画面へ</router-link>
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
      errorMessage: "",
    };
  },
  methods: {
    // アカウント作成
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((result) => {
          console.log(result);
          // データベースに保存
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
              // ログイン
              firebase
                .auth()
                .setPersistence(firebase.auth.Auth.Persistence.SESSION)
                .then(() => {
                  return (
                    firebase
                      .auth()
                      .signInWithEmailAndPassword(this.email, this.password)
                      .then((userCredential) => {
                        console.log(userCredential.user.uid);
                      })
                      // エラー判定
                      .catch((error) => {
                        console.log(error);
                      })
                  );
                });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    },
  },
};
</script>

<style scoped>
.color-red {
  color: red;
}
</style>
