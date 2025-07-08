import express from 'express';
import db from '../firebase/firebase.js';
import { generateReviewId, generateRestaurantId } from '../utils/idGenerators.js';
import updateRestaurantStats from '../utils/updateRestaurantStats.js';

const router = express.Router();
app.use(express.json());

// Add review
router.post('/', async (req, res) => {
  const {
    name,
    locality,
    city,
    user_id,
    review_text,
    price_range,
    food_quality,
    latitude,
    longitude,
    cleanliness_score,
    service_score,
    open_hours,
    images = [],
    best_dishes = []
  } = req.body;

  if (!name || !locality || !city || !user_id) {
    return res.status(400).json({ error: 'name, locality, city and user_id are required' });
  }

  const restaurant_id = generateRestaurantId(name, locality, city);

  // Check if restaurant exists
  const restaurantDoc = await db.collection('restaurants').doc(restaurant_id).get();
  if (!restaurantDoc.exists) {
    // Optionally create a new restaurant immediately
    await db.collection('restaurants').doc(restaurant_id).set({
      restaurant_id,
      name,
      locality,
      city,
      avg_cleanliness_score: cleanliness_score,
      avg_food_quality: food_quality,
      avg_service_score: service_score,
      avg_review_score: (food_quality + cleanliness_score + service_score) / 3,
      price_range,
      longitude,
      latitude,
      best_dishes,
      review_count: 1,
    });
  }

  const review_id = generateReviewId();

  await db.collection('reviews').doc(review_id).set({
    review_id,
    restaurant_id,
    user_id,
    open_hours: open_hours || '',
    images: images || [],
    review_text,
    price_range,
    food_quality,
    longitude,
    latitude,
    cleanliness_score,
    service_score,
    upvotes: 0,
    upvoted_by: [],
    best_dishes
  });

  await updateRestaurantStats(restaurant_id);

  res.status(201).json({ message: 'Review added', review_id, restaurant_id });
});

// Get all reviews for a restaurant
router.get('/restaurant/:restaurant_id', async (req, res) => {
  const snapshot = await db.collection('reviews')
    .where('restaurant_id', '==', req.params.restaurant_id)
    .get();

  const data = snapshot.docs.map(doc => doc.data());
  res.json(data);
});

// Get all reviews by a user
router.get('/:user_id/reviews', async (req, res) => {
  try {
    const snapshot = await db.collection('reviews')
      .where('user_id', '==', req.params.user_id)
      .get();

    const reviews = snapshot.docs.map(doc => doc.data());
    const resturentids=[...new Set(reviews.map(r => r.restaurant_id))];//fetching the resturant id from the reviews

    //fetching resturant data from resturant table
    const restaurantPromises=resturentids.map(id=>
      db.collection('restaurants').doc(id).get()
    );

     const restaurantDocs = await Promise.all(restaurantPromises);
    
     const resturant_data={};//creating a object to store resturant name

     restaurantDocs.forEach(doc => {
      if(doc.exists){
        resturant_data[doc.id]=doc.data().name;
      }
     });


     const final_review=reviews.map(r=>({
      ...r,
      restaurant_name: resturant_data[r.restaurant_id] || 'Unknown',
     }));

    res.json(final_review);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user reviews' });
  }
});

// Upvote a review
router.post('/:review_id/upvote', async (req, res) => {
  const { user_id } = req.body;
  const review_id = req.params.review_id;

  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' });
  }

  const reviewRef = db.collection('reviews').doc(review_id);
  const reviewSnap = await reviewRef.get();

  if (!reviewSnap.exists) {
    return res.status(404).json({ error: 'Review not found' });
  }

  const review = reviewSnap.data();

  if (review.upvoted_by?.includes(user_id)) {
    return res.status(400).json({ error: 'You have already upvoted this review' });
  }

  await reviewRef.update({
    upvotes: (review.upvotes || 0) + 1,
    upvoted_by: [...(review.upvoted_by || []), user_id]
  });

  // Increment popularity_score of the review author
  const userRef = db.collection('users').doc(review.user_id);
  const userSnap = await userRef.get();
  if (userSnap.exists) {
    const currentScore = userSnap.data().popularity_score || 0;
    await userRef.update({ popularity_score: currentScore + 1 });
  }

  res.status(200).json({ message: 'Upvoted successfully' });
});

export default router;
