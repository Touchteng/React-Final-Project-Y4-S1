import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyCWVa6vMPNQA9dbadt7O5FV_3KGFOUyKZk",
  authDomain: "react-cms-final.firebaseapp.com",
  projectId: "react-cms-final",
  storageBucket: "react-cms-final.appspot.com",
  messagingSenderId: "448884849012",
  appId: "1:448884849012:web:bef25dbe26f12b28191421"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase