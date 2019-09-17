import firebase from 'firebase';

class FirebaseSDK {
  constructor() {
    if (!firebase.apps.length) {
      //avoid re-initializing
      firebase.initializeApp({
        apiKey: "AIzaSyBA286vdV3Ur2xAlxfUukIISDUFtx5jrwA",
        authDomain: "xmetrik-1568608111088.firebaseapp.com",
        databaseURL: "https://xmetrik-1568608111088.firebaseio.com",
        projectId: "xmetrik-1568608111088",
        storageBucket: "",
        messagingSenderId: "708777567613",
        appId: "1:708777567613:web:10e9106fbd50c0fa839814"
      });
    }
  }
  
  login = async (user, success_callback, failed_callback) => {
    await firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(success_callback, failed_callback);
  };
}
const firebaseSDK = new FirebaseSDK();
export default firebaseSDK;