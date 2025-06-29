const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [String],
  steps: [String],
  category: { type: String, required: true },
  publishedDate: { type: String }
});

module.exports = mongoose.model('Recipe', recipeSchema);
