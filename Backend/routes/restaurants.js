import express from 'express';
import db from '../firebase/firebase.js';
import { generateRestaurantId } from '../utils/idGenerators.js';

const router = express.Router();

// Add new restaurant by the owner (optional) pending

router.post("/",async(res,req)=>{
  const{
    name_of_restaurant,
    owner_name,
    resturent_id,
    user_id,
    phone_number,
    email_address,
    link,
    varification_status,
    locality,
    city,
    GST_number,
    longitude,
    latitude,
    open_hours,
    images=[],
  }=req.body;

  if(!name_of_restaurant||!owner_name||!resturent_id||!user_id||!open_hours||!longitude||!locality||!city||!latitude||!images){
    return res.status(400).json({error:"name_of_restaurant, owner_name, resturent_id, user_id, open_hours, longitude, locality, city, latitude and images are required"});
  }


});

// Get all restaurants
router.get('/', async (req, res) => {
  let query = db.collection('restaurants');
  const {city,locality, min_cleanliness, price_range } = req.query;

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
