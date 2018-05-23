#!/usr/bin/env node
var firebase = require("firebase-admin");
const githubWrapper = require('../server/github-wrapper');
const _ = require('lodash');
const axios = require('axios');
const moment = require('moment');
//static port not gonna work in heroku. it provides an environment variable. use process.env.PORT variable
require('dotenv').config({ path: '.env.development' });

const date = moment().format("MM-DD-YYYY");
// const config = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.FIREBASE_DATABASE_URL,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
// };
// const serviceAccount = require('./serviceAccountKey.json')
const private_key = process.env.PRIVATE_KEY.replace(/\\n/g, '\r\n');
firebase.initializeApp({
  credential: firebase.credential.cert({
    "type": "service_account",
    "project_id": "github-download-tracker",
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": `-----BEGIN PRIVATE KEY-----\n${private_key}\n-----END PRIVATE KEY-----\n`,
    "client_email": "firebase-adminsdk-dzqec@github-download-tracker.iam.gserviceaccount.com",
    "client_id": process.env.CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-dzqec%40github-download-tracker.iam.gserviceaccount.com"
  }),
  // credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://github-download-tracker.firebaseio.com",
  databaseAuthVariableOverride: {
    uid: "my-service-worker"
  }
});

const database = firebase.database();

const getReleaseDataForRepo = (repo, userData) => {
  const url = `https://api.github.com/repos/${userData.username}/${repo}/releases?access_token=${userData.accessToken}`;
  console.log('url', url);
  return axios.get(url).then((response) => {
    const releases = response.data;
    return releases.map((release) => {

      const assets = release.assets.map((asset) => {
        return {
          name: asset.name.replace(/\./g, 'u002E'),
          downloadCount: asset.download_count
        }
      });
      return {
        tagName: release.tag_name.replace(/\./g, '-'),
        assets: assets
      };
    });
  }).catch((e) => {
    console.log('error', e.message);
  })
}

const saveToDb = (uid, repo, releases = [], userData) => {

  releases.forEach((release) => {

    release.assets.forEach((asset) => {

      const { name, downloadCount } = asset;
      const url = `/users/${uid}/repos/${repo}/${release.tagName}/assets/${name}/${date}`;
      database.ref(url).set(downloadCount)
    })
  })
}

const doStuff = () => {
  database.ref('users').once('value')
    .then((snapshot) => {


      snapshot.forEach((snapshotChild) => {
        const userData = snapshotChild.val();
        const uid = snapshotChild.key;
        console.log('uid', uid)

        _.each(userData.trackedRepos, (value, repo) => {
          getReleaseDataForRepo(repo, userData).then((releaseData) => {
            //save to db
            saveToDb(uid, repo, releaseData, userData)
          });
        });
        console.log(JSON.stringify(userData, null, 4));
      })
    })
}

doStuff();