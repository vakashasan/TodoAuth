import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCLPGG2U82pjlbHm-4vGM7w01krGqlHcIE",
  authDomain: "todo-app-react-6665a.firebaseapp.com",
  databaseURL: "https://todo-app-react-6665a-default-rtdb.firebaseio.com",
  projectId: "todo-app-react-6665a",
  storageBucket: "todo-app-react-6665a.appspot.com",
  messagingSenderId: "34366833723",
  appId: "1:34366833723:web:d12604dded9a7208c5081e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
