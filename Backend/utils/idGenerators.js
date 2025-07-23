import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export function generateRestaurantId(name, location, city) {
  return crypto.createHash('sha256')
    .update(`${name.trim().toLowerCase()}__${location.trim().toLowerCase()}__${city.trim().toLowerCase()}`)
    .digest('hex')
    .substring(0, 12);
}

export function generateReviewId() {
  return uuidv4();
}

export function generateUserId(email) {
  return crypto.createHash('sha256')
    .update(email.trim().toLowerCase())
    .digest('hex')
    .substring(0, 12);
}

export function generateQuestionId(headline, userId) {
  return crypto.createHash('sha256')
    .update(`${headline.trim().toLowerCase()}__${userId}`)
    .digest('hex')
    .substring(0, 12);
}

export function generateCommentId(parentId, userId, timestamp = Date.now()) {
  return crypto.createHash('sha256')
    .update(`${parentId}__${userId}__${timestamp}`)
    .digest('hex')
    .substring(0, 12);
}
