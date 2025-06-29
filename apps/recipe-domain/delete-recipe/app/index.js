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

// Endpoint to delete recipe
app.delete('/delete-recipe/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  // Find and delete the recipe
  const recipe = await Recipe.findByIdAndDelete(id);
  if (!recipe) {
    return res.status(404).send('Recipe not found');
  }

  res.send({ message: 'Recipe deleted successfully' });
});

app.listen(4003, () => {
  console.log('Server running on http://localhost:4003');
});
