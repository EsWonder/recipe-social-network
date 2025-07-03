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

// Endpoint para eliminar receta
app.delete('/delete-recipe/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findByIdAndDelete(id);
    if (!recipe) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }
    return res.status(200).json({ message: 'Receta eliminada con éxito' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Microservicio de eliminación de recetas escuchando en el puerto ${port}`);
});
