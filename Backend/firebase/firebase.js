import admin from 'firebase-admin';

// Dynamically import the service account JSON file
import { default as serviceAccount } from '../serviceAccountKey.json' with { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
export default db;
