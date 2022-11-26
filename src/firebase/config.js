import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBxDXx_ChdZXLByYOp_OApX5cm2jQCzyek",
  authDomain: "vue3-pinia-todolist.firebaseapp.com",
  projectId: "vue3-pinia-todolist",
  storageBucket: "vue3-pinia-todolist.appspot.com",
  messagingSenderId: "12560657275",
  appId: "1:12560657275:web:df410543823a5b9da3ebde"
}

const app = initializeApp(firebaseConfig)

// initialise firebase services
const db = getFirestore(app)
const auth = getAuth()

export {
  db,
  auth
}