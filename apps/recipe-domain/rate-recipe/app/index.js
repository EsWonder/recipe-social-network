const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Recipe = require('./models/Recipe');

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/recipe_db', { useNewUrlParser: true, useUnifiedTopology: true });

// Set up Express
const app = express();
app.use(express.json());

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(403).send('Token required');

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Invalid token');
  }
}

// Endpoint to rate recipe
app.post('/rate-recipe/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  // Validate rating value
  if (rating < 1 || rating > 5) {
    return res.status(400).send('Rating must be between 1 and 5');
  }

  // Find the recipe
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    return res.status(404).send('Recipe not found');
  }

  // Update the rating field (can be expanded later to include more complex rating logic)
  recipe.rating = rating;
  await recipe.save();

  res.send({ message: 'Recipe rated successfully' });
});

app.listen(4004, () => {
  console.log('Server running on http://localhost:4004');
});
