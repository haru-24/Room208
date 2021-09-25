<template>
  <div>
    <div class="title"><h1>Room208</h1></div>
    <div class="register-conteiner">
      <h1 class="register-text">新規登録</h1>
      <form class="login-form">
        <div class="input-group">
          <label for="user-name" class="user-name">ユーザーネーム</label>
          <input
            type="user-name"
            id="user-name"
            v-model="userName"
            class="input-username"
          />
        </div>
        <div class="input-group">
          <label for="email" class="email">メールアドレス</label>
          <input type="email" id="email" v-model="email" class="input-email" />
        </div>
        <div class="input-group">
          <label for="password" class="password">パスワード</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="input-password"
          />
        </div>
        <div class="input-group">
          <button type="button" @click="register" class="register-btn">
            新規登録
          </button>
          <br />
          <p class="err-msg">{{ errorMessage }}</p>
          <router-link to="/login/" class="login-router"
            >ログイン画面へ</router-link
          >
        </div>
      </form>
    </div>
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
.title {
  width: 306px;
  height: 81px;
  margin: 0 auto;

  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 87px;

  color: #505a59;
}
.register-conteiner {
  position: relative;
  margin: 0 auto;
  width: 650px;
  height: 400px;
  margin-top: 80px;

  background: rgba(229, 229, 229, 0.24);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.register-text {
  position: absolute;
  width: 144px;
  height: 41px;
  left: 255px;
  top: 10px;

  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 41px;

  color: #000000;
}
.user-name {
  position: absolute;
  width: 168px;
  height: 28px;
  left: 126px;
  top: 120px;

  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  /* identical to box height */

  color: #000000;
}
.input-username {
  position: absolute;
  width: 200px;
  height: 25px;
  left: 350px;
  top: 120px;

  background: #ffffff;
  mix-blend-mode: normal;
  border: 1px solid #000000;
  box-sizing: border-box;
}
.email {
  position: absolute;
  width: 168px;
  height: 28px;
  left: 126px;
  top: 170px;

  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  /* identical to box height */

  color: #000000;
}
.input-email {
  position: absolute;
  width: 200px;
  height: 25px;
  left: 350px;
  top: 170px;

  background: #ffffff;
  mix-blend-mode: normal;
  border: 1px solid #000000;
  box-sizing: border-box;
}
.password {
  position: absolute;
  width: 120px;
  height: 28px;
  left: 126px;
  top: 220px;

  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  /* identical to box height */

  color: #000000;
}
.input-password {
  position: absolute;
  width: 200px;
  height: 25px;
  left: 350px;
  top: 220px;

  background: #ffffff;
  mix-blend-mode: normal;
  border: 1px solid #000000;
  box-sizing: border-box;
}
.register-btn {
  position: absolute;
  width: 166px;
  height: 34px;
  left: 244px;
  top: 270px;

  background: #c4c4c4;
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  /* identical to box height */

  color: #000000;
  cursor: pointer;
}
.register-btn:hover {
  background: #838080;
}
.register-btn:active {
  top: 274px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
}
.login-router {
  position: absolute;
  width: 200px;
  height: 28px;
  left: 245px;
  top: 320px;

  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;
  /* identical to box height */

  display: flex;
  align-items: flex-end;
  text-decoration-line: underline;

  color: #000000;
}
.login-router:hover {
  color: rgb(179, 185, 185);
}
.login-router:active {
  top: 322px;
}
.err-msg {
  position: absolute;
  top: 340px;
  left: 180px;
  color: red;
}
</style>
