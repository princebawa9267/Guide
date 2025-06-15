const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

function generateRestaurantId(name, city) {
  return crypto.createHash('sha256')
    .update(`${name.trim().toLowerCase()}__${city.trim().toLowerCase()}`)
    .digest('hex')
    .substring(0, 12); // shorten for readability
}

function generateReviewId() {
  return uuidv4();
}

module.exports = { generateRestaurantId, generateReviewId };
