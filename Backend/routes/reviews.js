const express = require('express');
const router = express.Router();
const db = require('../firebase/firebase');
const updateRestaurantStats = require('../utils/updateRestaurantStats');
const { generateReviewId, generateRestaurantId } = require('../utils/idGenerators');

// Add review
router.post('/', async (req, res) => {
  const {
    user_id, restaurant_name, city,
    review_text, price_range, food_quality,
    cleaniness_score, service_score,
    location_of_restaurant, open_hours, images, best_dishes
  } = req.body;

  if (!restaurant_name || !city || !user_id) {
    return res.status(400).json({ error: 'restaurant_name, city, and user_id required' });
  }

  const restaurant_id = generateRestaurantId(restaurant_name, city);
  const review_id = generateReviewId();

  // Save review
  await db.collection('reviews').doc(review_id).set({
    review_id,
    restaurant_id,
    user_id,
    open_hours: open_hours || '',
    images: images || [],
    review_text,
    price_range,
    food_quality,
    cleaniness_score,
    service_score,
    upvotes: 0,
    upvoted_by: [],
    location_of_restaurant,
    best_dishes: best_dishes || [],
    created_at: Date.now()
  });

  // Check if restaurant exists
  const restaurantDoc = await db.collection('restaurants').doc(restaurant_id).get();

  if (!restaurantDoc.exists) {
    const snapshot = await db.collection('reviews')
      .where('restaurant_id', '==', restaurant_id)
      .get();

    if (snapshot.size >= 5) {
      await db.collection('restaurants').doc(restaurant_id).set({
        restaurant_id,
        name: restaurant_name,
        city,
        created_by_reviews: true
      });
    }
  }

  await updateRestaurantStats(restaurant_id);

  res.status(201).json({
    message: 'Review added and restaurant updated',
    review_id,
    restaurant_id
  });
});

// Get all reviews for a restaurant
router.get('/restaurant/:restaurant_id', async (req, res) => {
  const snapshot = await db.collection('reviews')
    .where('restaurant_id', '==', req.params.restaurant_id)
    .get();

  const data = snapshot.docs.map(doc => doc.data());
  res.json(data);
});

// Get all reviews written by a user
router.get('/:user_id/reviews', async (req, res) => {
  try {
    const snapshot = await db.collection('reviews')
      .where('user_id', '==', req.params.user_id)
      .get();

    const reviews = snapshot.docs.map(doc => doc.data());
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user reviews' });
  }
});

// Upvote a review
router.post('/:review_id/upvote', async (req, res) => {
  const { user_id } = req.body;
  const review_id = req.params.review_id;

  if (!user_id) return res.status(400).json({ error: 'user_id is required' });

  const reviewRef = db.collection('reviews').doc(review_id);
  const reviewSnap = await reviewRef.get();

  if (!reviewSnap.exists) return res.status(404).json({ error: 'Review not found' });

  const review = reviewSnap.data();

  if (review.upvoted_by.includes(user_id)) {
    return res.status(400).json({ error: 'You have already upvoted this review' });
  }

  await reviewRef.update({
    upvotes: (review.upvotes || 0) + 1,
    upvoted_by: [...review.upvoted_by, user_id]
  });

  const userRef = db.collection('users').doc(review.user_id);
  const userSnap = await userRef.get();
  if (userSnap.exists) {
    const currentScore = userSnap.data().popularity_score || 0;
    await userRef.update({ popularity_score: currentScore + 1 });
  }

  res.status(200).json({ message: 'Upvoted successfully' });
});

module.exports = router;
