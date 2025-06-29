import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';

export function generateRestaurantId(name, city) {
  return crypto.createHash('sha256')
    .update(`${name.trim().toLowerCase()}__${city.trim().toLowerCase()}`)
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
