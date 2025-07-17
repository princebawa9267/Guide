import express from 'express';
import db from '../firebase/firebase.js';
import { generateRestaurantId } from '../utils/idGenerators.js';
import admin from 'firebase-admin';

const router = express.Router();

// Add new restaurant by the owner
router.post("/addedbyowner", async (req, res) => {
  try {
    const {
      name_of_restaurant,
      owner_name,
      resturant_id, // spelling inconsistent — kept for your original logic
      user_id,
      phone_number,
      email_address,
      link,
      varification_status, // spelling inconsistent — fixed later
      locality,
      city,
      GST_number,
      longitude,
      latitude,
      open_hours,
      images = []
    } = req.body;

    //Required field validation
    if (
      !name_of_restaurant || !owner_name ||  !user_id ||
      !open_hours || !longitude || !locality || !city || !latitude || images.length === 0
    ) {
      return res.status(400).json({
        error: "name_of_restaurant, owner_name, user_id, open_hours, longitude, locality, city, latitude and images are required"
      });
    }else{
      console.log("Payload received:", req.body);
    }

    const restaurant_id = generateRestaurantId(name_of_restaurant, locality, city);
    const restaurant_ref = db.collection("restaurants").doc(restaurant_id);
    const restaurant_doc = await restaurant_ref.get();

    // Update restaurant if it exists
    if (restaurant_doc.exists) {
      await restaurant_ref.update({
        name: name_of_restaurant,
        locality,
        city,
        open_hours,
        latitude,
        link,
        longitude,
        updated_by: user_id,
        updated_from: "owner",
        last_updated: Date.now()
      });
    } else {
      // Create new restaurant if it doesn't exist
      await restaurant_ref.set({
        restaurant_id,
        name: name_of_restaurant,
        locality,
        city,
        open_hours,
        latitude,
        longitude,
        link,
        price_range: 0,
        review_count: 0,
        avg_cleanliness_score: 0,
        avg_food_quality: 0,
        avg_service_score: 0,
        avg_review_score: 0,
        best_dishes: [],
        added_by: user_id,
        added_from: "shop_register",
        created_at: Date.now()
      });
    }

    await db.collection("Users").doc(user_id).set({
      isOwner: true
    }, { merge: true }); // 🛠 FIXED typo: 'mergerd' → 'merge'


    // Add or update owner record
    await db.collection("owners").doc(user_id).set({
      user_id,
      name_of_restaurant,
      owner_name,
      phone_number,
      email_address,
      link,
      locality,
      city,
      GST_number,
      longitude,
      latitude,
      open_hours,
      images,
      status: "pending",
      verification_status: false, // 🛠 spelling corrected
      restaurant_ids: admin.firestore.FieldValue.arrayUnion(restaurant_id),
      updated_at: Date.now()
    }, { merge: true });

    return res.status(201).json({
      message: restaurant_doc.exists
        ? "Restaurant updated with owner details"
        : "Restaurant created with owner details",
      restaurant_id
    });

  } catch (err) {
    console.error("Error in shop_register:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Get all restaurants
router.get('/', async (req, res) => {
  let query = db.collection('restaurants');
  const { city, locality, min_cleanliness, price_range } = req.query;

  if (city) {
    query = query.where('city', '==', city.trim().toLowerCase());
  }

  if (locality) {
    query = query.where('locality', '==', locality.toLowerCase());
  }
  if (min_cleanliness) {
    query = query.where('avg_cleanliness_score', '>=', Number(min_cleanliness));
  }
  if (price_range) {
    query = query.where('price_range', '==', Number(price_range));
  }

  // ORDER BY avg_rating_score DESC
  // query = query.orderBy('avg_rating_score', 'desc');

  try {
    const snapshot = await query.get();
    const data = snapshot.docs.map(doc => doc.data());

    if (data.length === 0) {
      return res.status(404).json({ error: 'No restaurants found' });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
});


// Get single restaurant
router.get('/:id', async (req, res) => {
  const doc = await db.collection('restaurants').doc(req.params.id).get();
  if (!doc.exists) return res.status(404).json({ error: 'Not found' });
  res.json(doc.data());
});

export default router;
