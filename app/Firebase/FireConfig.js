// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNATHm5KGC4T-4Dcr7OOBBgf3xfuoFROU",
  authDomain: "mytodolist-77176.firebaseapp.com",
  projectId: "mytodolist-77176",
  storageBucket: "mytodolist-77176.appspot.com",
  messagingSenderId: "243324763895",
  appId: "1:243324763895:web:bd99ffed9757323b341df2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
