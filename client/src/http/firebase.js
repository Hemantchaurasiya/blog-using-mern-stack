import { initializeApp } from 'firebase/app';
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "blog-7af03.firebaseapp.com",
  projectId: "blog-7af03",
  storageBucket: "blog-7af03.appspot.com",
  messagingSenderId: "170916078004",
  appId: "1:170916078004:web:41f89589255344f1a612e1",
  measurementId: "G-GPFJHPHN27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var storage = getStorage(app);

export default storage;