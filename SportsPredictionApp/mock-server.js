const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS so your app can access this API
app.use(express.json()); // Parse JSON bodies

// In-memory store for predictions
const predictions = [];

// POST /predictions - submit a prediction
app.post('/predictions', (req, res) => {
  const prediction = req.body;
  if (!prediction || !prediction.gameId) {
    return res.status(400).json({error: 'Invalid prediction data'});
  }
  predictions.push(prediction);
  res.status(201).json({message: 'Prediction submitted', prediction});
});

// GET /predictions - get all predictions
app.get('/predictions', (req, res) => {
  res.json(predictions);
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});
