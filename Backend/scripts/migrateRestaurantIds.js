import db from '../firebase/firebase.js';
import { generateRestaurantId } from '../utils/idGenerators.js';

async function migrateRestaurantIds() {
  console.log("Starting migration...");

  const restaurantsSnap = await db.collection('restaurants').get();

  for (const doc of restaurantsSnap.docs) {
    const oldId = doc.id;
    const restaurantData = doc.data();

    // Old records may not have city field
    const { name, locality, city } = restaurantData;

    if (!name || !locality || !city) {
      console.log(`Skipping restaurant ${oldId} — missing fields.`);
      continue;
    }

    const newId = generateRestaurantId(name, locality, city);

    if (newId === oldId) {
      console.log(`Restaurant ${name} already has correct ID.`);
      continue;
    }

    console.log(`Updating restaurant ${name}: ${oldId} → ${newId}`);

    // 1. Copy restaurant data to new doc
    await db.collection('restaurants').doc(newId).set({
      ...restaurantData,
      restaurant_id: newId
    });

    // 2. Update reviews pointing to old restaurant_id
    const reviewsSnap = await db.collection('reviews')
      .where('restaurant_id', '==', oldId)
      .get();

    for (const reviewDoc of reviewsSnap.docs) {
      await reviewDoc.ref.update({
        restaurant_id: newId
      });
      console.log(`Updated review ${reviewDoc.id} → new restaurant_id`);
    }

    // 3. Delete the old restaurant doc
    await db.collection('restaurants').doc(oldId).delete();
    console.log(`Deleted old restaurant document ${oldId}`);
  }

  console.log("Migration completed.");
}

migrateRestaurantIds()
  .then(() => {
    console.log("✅ All done!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
