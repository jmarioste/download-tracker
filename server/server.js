const express = require('express');
const path = require('path');
const firebase = require('firebase');
const githubWrapper = require('./github-wrapper');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
//static port not gonna work in heroku. it provides an environment variable. use process.env.PORT variable
require('dotenv').config({ path: '.env.development' });

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};


firebase.initializeApp(config);

const database = firebase.database();


const port = process.env.PORT || 3000;
app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});


app.listen(port, () => {
  console.log("Server is up!");
  database.ref('users/').once('value').then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      var user = childSnapshot.val();
      githubWrapper.getReposForUser(user);

    });
  });
});