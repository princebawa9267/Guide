import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRoutes from './routes/users.js';
import restaurantRoutes from './routes/restaurants.js';
import reviewRoutes from './routes/reviews.js';
import questionRoutes from './routes/questions.js';
import commentRoutes from './routes/comments.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/reviews', reviewRoutes);
app.use('/questions', questionRoutes);
app.use('/comments', commentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
