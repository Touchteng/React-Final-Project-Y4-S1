import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAIaka65fqTTEiScplk5CHcjFrANHBYD4Y",
  authDomain: "blogapp-1582d.firebaseapp.com",
  projectId: "blogapp-1582d",
  storageBucket: "blogapp-1582d.appspot.com",
  messagingSenderId: "991311125603",
  appId: "1:991311125603:web:0e1bd1652758c4842aac56"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}

const fire = firebase;
export default fire;