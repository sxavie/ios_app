import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tidux-e9e5d.firebaseio.com"
});

export const tokenGenerator = functions.https.onRequest((req, res) => {
  let id = 'Uvty27c123x'

  let additionalClaims = {
    nombre: 'xavier',
    email: 'xavier.hernandez@vasster.com',
    numero: '8126387799',
    isAdmin: true,
    password: '123'
  };

  admin.auth().createCustomToken(id, additionalClaims)
    .then( customToken => {
      res.json( customToken );
    })
})



 




