import express from 'express';
import db from '../firebase/firebase.js';
import { generateUserId } from '../utils/idGenerators.js';

const router = express.Router();

router.post('/', async (req, res) => {
  let { user_id, name, email, location } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'email is required' });
  }

  if (!user_id) {
    // generate a unique user_id if not provided
    user_id = generateUserId(email);
  }

  await db.collection('users').doc(user_id).set({
    user_id,
    name,
    email,
    location,
    checkmarked_locations: [],
    preferences: {},
    popularity_score: 0
  }, { merge: true });

  res.status(201).json({ message: 'User created/updated', user_id });
});

router.get('/:user_id', async (req, res) => {
  const doc = await db.collection('users').doc(req.params.user_id).get();
  if (!doc.exists) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(doc.data());
});

export default router;
