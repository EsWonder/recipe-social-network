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

// Endpoint to update recipe
app.put('/update-recipe/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, ingredients, steps, category } = req.body;

  // Find the recipe
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    return res.status(404).send('Recipe not found');
  }

  // Update fields
  recipe.title = title || recipe.title;
  recipe.description = description || recipe.description;
  recipe.ingredients = ingredients || recipe.ingredients;
  recipe.steps = steps || recipe.steps;
  recipe.category = category || recipe.category;

  await recipe.save();
  res.send(recipe);
});

app.listen(4002, () => {
  console.log('Server running on http://localhost:4002');
});
