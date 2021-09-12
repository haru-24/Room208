import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import firebase from "firebase/app";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyD4hkO7dWqs0WBy2mgvu_lVO-12_q9zyZA",
  authDomain: "room208-79101.firebaseapp.com",
  projectId: "room208-79101",
  storageBucket: "room208-79101.appspot.com",
  messagingSenderId: "120391081480",
  appId: "1:120391081480:web:90ea60ee1492235d07bbbd",
  measurementId: "G-VF448B14TG",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.firebase = firebase;

new Vue({
  router,

  render: (h) => h(App),
}).$mount("#app");
