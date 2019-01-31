import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyDluonuaPcLFWSjnA7h8EaRCKxZnUHJ19g",
  authDomain: "foodber-65c10.firebaseapp.com",
  databaseURL: "https://foodber-65c10.firebaseio.com",
  projectId: "foodber-65c10",
  storageBucket: "foodber-65c10.appspot.com",
  messagingSenderId: "669394895252"
};

firebase.initializeApp(config);
const db = firebase.database().ref();

// export const trucksCollection = db.collection("trucks");

export default db;
