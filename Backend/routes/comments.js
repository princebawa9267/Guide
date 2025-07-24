import express from 'express';
import db from '../firebase/firebase.js';
import { generateCommentId } from '../utils/idGenerators.js';

const router = express.Router();

// Add a comment to a question
router.post('/:questionId', async (req, res) => {
  try {
    const { user_id, text, parent_comment_id = null } = req.body;
    const comment_id = generateCommentId(user_id, text);
    const newComment = {
      comment_id,
      user_id,
      text,
      parent_comment_id,
      question_id: req.params.questionId,
      upvotes: 0,
      upvoted_by: [],
      child_comments: [],
      created_at: new Date().toISOString()
    };

    await db.collection('comments').doc(comment_id).set(newComment);

    // Link to parent
    if (parent_comment_id) {
      const parentRef = db.collection('comments').doc(parent_comment_id);
      await parentRef.update({
        child_comments: admin.firestore.FieldValue.arrayUnion(comment_id)
      });
    } else {
      const qRef = db.collection('questions').doc(req.params.questionId);
      await qRef.update({
        comments: admin.firestore.FieldValue.arrayUnion(comment_id)
      });
    }

    res.status(201).json({ message: 'Comment added', comment_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all top-level comments for a question
router.get('/question/:questionId', async (req, res) => {
  try {
    const snapshot = await db.collection('comments')
      .where('question_id', '==', req.params.questionId)
      .where('parent_comment_id', '==', null)
      .get();

    const comments = snapshot.docs.map(doc => doc.data());
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get child comments of a comment
router.get('/parent/:commentId', async (req, res) => {
  try {
    const snapshot = await db.collection('comments')
      .where('parent_comment_id', '==', req.params.commentId)
      .get();

    const comments = snapshot.docs.map(doc => doc.data());
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upvote / Un-upvote a comment
router.post('/upvote/:commentId', async (req, res) => {
  try {
    const { user_id } = req.body;
    const ref = db.collection('comments').doc(req.params.commentId);
    const doc = await ref.get();
    if (!doc.exists) return res.status(404).json({ error: 'Comment not found' });

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

    await ref.update(update);
    res.json({ message: 'Upvote status updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete comment (only author)
router.delete('/:commentId', async (req, res) => {
  try {
    const doc = await db.collection('comments').doc(req.params.commentId).get();
    if (!doc.exists) return res.status(404).json({ error: 'Not found' });

    if (doc.data().user_id !== req.body.user_id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await db.collection('comments').doc(req.params.commentId).delete();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
