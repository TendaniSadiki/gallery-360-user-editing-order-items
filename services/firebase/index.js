// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import AsyncStorage from '@react-native-async-storage/async-storage'
import {getAuth, initializeAuth} from 'firebase/auth';
import {getReactNativePersistence, setPersistence} from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCqBD_w3D_yiV2w63rlLoH8ZSqRPS-wCM",
  authDomain: "gallery-360-africa.firebaseapp.com",
  projectId: "gallery-360-africa",
  storageBucket: "gallery-360-africa.appspot.com",
  messagingSenderId: "977191750253",
  appId: "1:977191750253:web:e904658e10a43b0e5fcd64",
  measurementId: "G-XDXYJT7HBJ",
};

// Initialize Firebase
let app;
console.log(firebase.apps.length);

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
  console.log('already init');

} else {
  app = firebase.app();
  console.log('no init');
  
}


// const auth = getAuth(app).setPersistence(firebase.auth.Auth.Persistence.LOCAL);
const localPersistence = getReactNativePersistence(AsyncStorage);

const auth = initializeAuth(app, {
  persistence: localPersistence
});
// setPersistence(auth, localPersistence);
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });
// console.log(auth);

// const auth = getAuth()
const firestore = firebase.firestore();
const storageRef = firebase.storage().ref();

const fb = firebase.storage.TaskEvent.STATE_CHANGED;

export { auth, firestore, storageRef, fb }