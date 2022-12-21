import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDP8RUyDkxVt1Y4DlhS6JSvg7sZpk98jd8",
    authDomain: "vue-vite-ts-vuetify.firebaseapp.com",
    projectId: "vue-vite-ts-vuetify",
    storageBucket: "vue-vite-ts-vuetify.appspot.com",
    messagingSenderId: "98450968378",
    appId: "1:98450968378:web:991e49f9423e2d3d8f4a03"
  };

  firebase.initializeApp(firebaseConfig)

  const storage = firebase.storage()
  const db = firebase.firestore()

  export { storage, db }