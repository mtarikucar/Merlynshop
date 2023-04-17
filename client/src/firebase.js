// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDNBXDP-fPk05d_h48P6osl8wCbb47Vzkk",
    authDomain: "nurlight-772de.firebaseapp.com",
    projectId: "nurlight-772de",
    storageBucket: "nurlight-772de.appspot.com",
    messagingSenderId: "741247739776",
    appId: "1:741247739776:web:acdbdbbd957e1ebffa4365",
    measurementId: "G-5MJWCPR96V"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const storage = getStorage(firebase);


export {storage};