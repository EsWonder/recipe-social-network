const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('../models/recipe');

const app = express();
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/recipeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Endpoint para crear receta
app.post('/create-recipe', async (req, res) => {
  const { title, description, imageUrl, videoUrl, ingredients, createdBy } = req.body;

  if (!title || !description || !createdBy) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  try {
    const newRecipe = new Recipe({
      title,
      description,
      imageUrl,
      videoUrl,
      ingredients,
      createdBy,
    });
    await newRecipe.save();
    return res.status(201).json({ message: 'Receta creada con éxito', recipe: newRecipe });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Microservicio de creación de recetas escuchando en el puerto ${port}`);
});
