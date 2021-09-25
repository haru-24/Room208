<template>
  <div class="login">
    <div class="title">
      <h1>Room208</h1>
    </div>

    <div class="login-conteiner">
      <h1 class="login-text">ログイン</h1>
      <form class="login-form">
        <div>
          <label for="email" class="email">メールアドレス</label>
          <input type="email" class="input-email" id="email" v-model="email" />
        </div>
        <div class="input-group">
          <label for="password" class="password">パスワード</label>
          <input
            type="password"
            id="password"
            v-model="password"
            @keypress.enter="login"
            class="input-password"
          />
        </div>
        <div class="input-group">
          <button type="button" @click="login" class="login-btn">
            ログイン
          </button>
        </div>
      </form>
      <p class="err-msg">{{ errorMessage }}</p>
      <router-link to="/login/register" class="register">新規登録</router-link>
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
      errorMessage: "",
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
              console.log(userCredential.user.uid);
            })
            .catch((error) => {
              this.errorMessage = error.message;
            });
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
.login-conteiner {
  position: relative;
  margin: 0 auto;
  width: 650px;
  height: 400px;

  margin-top: 80px;

  background: rgba(229, 229, 229, 0.24);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
.login-text {
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
.email {
  position: absolute;
  width: 168px;
  height: 28px;
  left: 126px;
  top: 123px;

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
  top: 123px;

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
  top: 184px;

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
  top: 184px;

  background: #ffffff;
  mix-blend-mode: normal;
  border: 1px solid #000000;
  box-sizing: border-box;
}
.login-btn {
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
.login-btn:hover {
  background: #838080;
}
.login-btn:active {
  top: 274px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
}
.register {
  position: absolute;
  width: 96px;
  height: 28px;
  left: 277px;
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
.register:hover {
  color: rgb(179, 185, 185);
}
.register:active {
  top: 322px;
}

.err-msg {
  position: absolute;
  top: 340px;
  left: 180px;
  color: red;
}
</style>
