import * as firebase from 'firebase'
import * as Google from 'expo-google-app-auth'

const firebaseConfig = {
  apiKey: "AIzaSyBKsvgv_C_idYx0rDIt3N8qLMs3RaOH7yY",
  authDomain: "digiceiptsg.firebaseapp.com",
  databaseURL: "https://digiceiptsg.firebaseio.com",
  projectId: "digiceiptsg",
  storageBucket: "",
  messagingSenderId: "221702261066",
  appId: "1:221702261066:web:4283778199e23585"
};

firebase.initializeApp(firebaseConfig)

const database = firebase.database()

export function addReceiptToID(receiptData, userID) {
  receiptData.timestamp = Date.now()
  return database.ref('receiptdata/' + userID).push(receiptData)
}

export function getReceiptDataWithID(userID) {
  return database.ref('receiptdata/' + userID)
}

export function deleteReceiptDataWithID(userID, receiptID) {
  return database.ref('receiptdata/' + userID + '/' + receiptID).remove()
}

export function snapshotToArray(snapshot) {
  var returnArr = [];

  snapshot.forEach(function(childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;

      returnArr.push(item);
  });

  return returnArr;
};