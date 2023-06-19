/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins } from "@/plugins";


//Axios
import axios from "axios";
import VueAxios from "vue-axios";
import { createPinia } from 'pinia'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW3lLDfcUwN9pgI5Ut58mxvwsylw5X-So",
  authDomain: "aula8-58352.firebaseapp.com",
  databaseURL: "https://aula8-58352-default-rtdb.firebaseio.com",
  projectId: "aula8-58352",
  storageBucket: "aula8-58352.appspot.com",
  messagingSenderId: "585310222237",
  appId: "1:585310222237:web:013a768578ff59e4f3a174"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const pinia = createPinia()
const app = createApp(App);

registerPlugins(app);

app.use(VueAxios, axios);
app.use(pinia);

app.mount("#app");
