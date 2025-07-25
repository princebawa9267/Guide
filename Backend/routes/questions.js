import express from 'express';
import db from '../firebase/firebase.js';
import { generateQuestionId } from '../utils/idGenerators.js';


const router = express.Router();

// Get all questions (optional tag filtering)
router.get('/all', async (req, res) => {
  try {
    let query = db.collection('questions');
    if (req.query.tag) {
      query = query.where('tags', 'array-contains', req.query.tag);
    }

    const snapshot = await query.get();
    const questions = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        headline: data.headline,
        photoURL: data.photoURL || null, // <-- include photoURL
        userName: data.userName || 'Anonymous', // <-- include userName
        description: data.description || '',
        created_at: data.created_at || new Date().toISOString(),
        upvotes: data.upvotes || 0,
        tags: data.tags || [],
        image_url: data.image_url || null  // <-- include image_url
      };
    });

    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get full data of a question by ID
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('questions').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: 'Question not found' });
    res.json(doc.data());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new question
router.post('/', async (req, res) => {
  try {
    const { user_id, headline,photoURL,userName, description, tags = [], image_url = null } = req.body;

    if (!user_id || !headline) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const id = generateQuestionId(headline, user_id);
    await db.collection('questions').doc(id).set({
      id,
      user_id,
      headline,
      description,
      tags,
      photoURL,
      userName,
      image_url,  // <-- added image_url here
      upvotes: 0,
      upvoted_by: [],
      reported: false,
      created_at: new Date().toISOString(),
      comments: []
    });

    res.status(201).json({ message: 'Question created', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete question
router.delete('/:id', async (req, res) => {
  try {
    const doc = await db.collection('questions').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: 'Question not found' });

    const question = doc.data();
    if (question.user_id !== req.body.user_id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await db.collection('questions').doc(req.params.id).delete();
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upvote / Remove upvote
router.post('/:id/upvote', async (req, res) => {
  try {
    const { user_id } = req.body;
    const docRef = db.collection('questions').doc(req.params.id);
    const doc = await docRef.get();
    if (!doc.exists) return res.status(404).json({ error: 'Not found' });

    const data = doc.data();
    const upvoted = data.upvoted_by || [];

    let update;
    if (upvoted.includes(user_id)) {
      update = {
        upvotes: data.upvotes - 1,
        upvoted_by: upvoted.filter(id => id !== user_id)
      };
    } else {
      update = {
        upvotes: data.upvotes + 1,
        upvoted_by: [...upvoted, user_id]
      };
    }

    await docRef.update(update);
    res.json({ message: 'Upvote status updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Report question
router.post('/:id/report', async (req, res) => {
  try {
    await db.collection('questions').doc(req.params.id).update({ reported: true });
    res.json({ message: 'Reported' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
