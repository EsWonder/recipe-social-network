const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  res.status(201).json({
    message: 'User registered',
    user: { name, email }
  });
});

app.listen(port, () => {
  console.log(`Register-user running on port ${port}`);
});
