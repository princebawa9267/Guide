import db from '../firebase/firebase.js';
import { pipeline } from '@xenova/transformers';

let summarizer = null;

const loadSummarizer = async () => {
  if (!summarizer) {
    summarizer = await pipeline('summarization', 'Xenova/distilbart-cnn-6-6');
  }
  return summarizer;
};

const updateRestaurantStats = async (restaurant_id) => {
  const reviewsSnap = await db.collection('reviews')
    .where('restaurant_id', '==', restaurant_id)
    .get();

  const reviews = reviewsSnap.docs.map(doc => doc.data());
  if (reviews.length === 0) return;

  const avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  const median = arr => {
    const sorted = arr.slice().sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  };

  const price_range = avg(reviews.map(r => Number(r.price_range || 0)));
  const food_quality = avg(reviews.map(r => Number(r.food_quality || 0)));
  const cleaniness_score = avg(reviews.map(r => Number(r.cleaniness_score || 0)));
  const service_score = avg(reviews.map(r => Number(r.service_score || 0)));

  const latitudes = reviews
    .map(r => r.location_of_restaurant?.lat)
    .filter(lat => typeof lat === 'number');
  const longitudes = reviews
    .map(r => r.location_of_restaurant?.long)
    .filter(long => typeof long === 'number');

  const median_lat = median(latitudes);
  const median_long = median(longitudes);

  // Aggregate best dishes
  const allDishes = new Set();
  reviews.forEach(r => {
    if (Array.isArray(r.best_dishes)) {
      r.best_dishes.forEach(dish => allDishes.add(dish.trim().toLowerCase()));
    }
  });

  let summary;
  if (reviews.length % 5 === 0) {
    try {
      const summarizerInstance = await loadSummarizer();
      const text = reviews.map(r => r.review_text).join('\n').slice(0, 2000);
      const result = await summarizerInstance(text, { max_length: 130, min_length: 40 });
      summary = result[0].summary_text;
    } catch (err) {
      console.error('Summarization error:', err.message);
    }
  }

  const updateObj = {
    avg_food_quality: parseFloat(food_quality.toFixed(2)),
    avg_cleaniness_score: parseFloat(cleaniness_score.toFixed(2)),
    avg_service_score: parseFloat(service_score.toFixed(2)),
    price_range: parseFloat(price_range.toFixed(2)),
    location: {
      lat: median_lat,
      long: median_long
    },
    best_dishes: Array.from(allDishes),
  };

  if (summary) {
    updateObj.summary = summary;
  }

  await db.collection('restaurants').doc(restaurant_id).update(updateObj);
};

export default updateRestaurantStats;
