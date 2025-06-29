const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [String],
  steps: [String],
  category: { type: String, required: true },
  publishedDate: { type: String },
  rating: { type: Number, min: 1, max: 5 }  // Added rating field
});

module.exports = mongoose.model('Recipe', recipeSchema);
