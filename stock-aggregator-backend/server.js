const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Root route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Stock Aggregator Backend API');
});

// API Routes
app.use('/api/auth', require('./routes/auth'));

// MongoDB Connection & Server Start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
