import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb_FPlQJt4Jto0TIre9axfi2fDMxmyxC0",
  authDomain: "sdsd-f6fec.firebaseapp.com",
  projectId: "sdsd-f6fec",
  storageBucket: "sdsd-f6fec.appspot.com",
  messagingSenderId: "293207792431",
  appId: "1:293207792431:web:f96578e5731857c3c31fda",
  measurementId: "G-20708SEFHB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
