const express = require('express');
const router = express.Router();
const db = require('../firebase/firebase');

// Create or update user
router.post('/', async (req, res) => {
  const { user_id, name, email, location } = req.body;

  if (!user_id || !email) {
    return res.status(400).json({ error: 'user_id and email required' });
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

  res.status(201).json({ message: 'User created/updated' });
});

// Get user data
router.get('/:user_id', async (req, res) => {
  const doc = await db.collection('users').doc(req.params.user_id).get();
  if (!doc.exists) return res.status(404).json({ error: 'User not found' });
  res.json(doc.data());
});

module.exports = router;
