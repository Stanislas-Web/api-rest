import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as functions from 'firebase-functions';
// tslint:disable-next-line: no-import-side-effect
import 'module-alias/register';
// tslint:disable-next-line: no-implicit-dependencies
import { router } from '@routes/index';
import * as path from 'path';
import * as admin from 'firebase-admin';
// *developpement mode


// *production mode
// const PORT = 80; 

const app = express();
const app2 = express();
// body middleware bodyParser
// tslint:disable-next-line: deprecation
app.use(bodyParser.urlencoded({extended: true}));
// tslint:disable-next-line: deprecation
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public'), {}))
// cors middleware
app.use(cors()); 

// Authorization middleware


// routing middleware

app.use(router); 
app2.use(express.static(path.join(__dirname,'public')));
app2.get('**', (req, res) => {
    res.sendFile(path.join(__dirname,'/public/index.html'));
});

/**
 * cloud functions
 */ 

  exports.messageCreatedDate = functions.firestore
  .document('messages/{messageId}')
  .onCreate((snap, context) => {
    return snap.ref.set(
      {
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      },
      { merge: true }
    );
  });




export const api = functions.https.onRequest(app)


