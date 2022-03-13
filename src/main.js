import { createApp } from 'vue'
import App from './App.vue'
import router from './router'



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvrnKMuhBbsFh6sWx-cLksgUPPAlXnJFU",
  authDomain: "icms-journeyoflife.firebaseapp.com",
  projectId: "icms-journeyoflife",
  storageBucket: "icms-journeyoflife.appspot.com",
  messagingSenderId: "679695129854",
  appId: "1:679695129854:web:85600f9d9a1e6fca7999af",
  measurementId: "G-1HMC0X472X"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);



const app = createApp(App);
app.use(router);
app.config.unwrapInjectedRef = true;
app.mount('#app');