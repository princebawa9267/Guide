const express = require('express');
const router = express.Router();
const db = require('../firebase/firebase');
const { generateRestaurantId } = require('../utils/idGenerators');

// Add new restaurant (optional)
router.post('/', async (req, res) => {
  const { name, city, ...otherFields } = req.body;

  if (!name || !city) {
    return res.status(400).json({ error: 'name and city are required' });
  }

  const restaurant_id = generateRestaurantId(name, city);
  const docRef = db.collection('restaurants').doc(restaurant_id);

  const docSnap = await docRef.get();
  if (docSnap.exists) {
    return res.status(409).json({ error: 'Restaurant already exists', restaurant_id });
  }

  await docRef.set({
    restaurant_id,
    name,
    city,
    ...otherFields
  });

  res.status(201).json({ message: 'Restaurant added', restaurant_id });
});

// Get all restaurants
router.get('/', async (req, res) => {
  let query = db.collection('restaurants');
  const { city, min_cleaniness, price_range } = req.query;

  if (city) query = query.where('city', '==', city);
  if (min_cleaniness) query = query.where('avg_cleaniness_score', '>=', Number(min_cleaniness));
  if (price_range) query = query.where('price_range', '==', Number(price_range));

  const snapshot = await query.get();
  const data = snapshot.docs.map(doc => doc.data());

  res.json(data);
});

// Get single restaurant
router.get('/:id', async (req, res) => {
  const doc = await db.collection('restaurants').doc(req.params.id).get();
  if (!doc.exists) return res.status(404).json({ error: 'Not found' });
  res.json(doc.data());
});

module.exports = router;
