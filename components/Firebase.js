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

const { type, accessToken, user} = await Google.logInAsync()
