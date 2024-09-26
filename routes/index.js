const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');

// API Routes
router.use('/api', apiRoutes);

// Data Services Health
router.get('/health', (req, res) => {
  res.send({ message: 'Expense API Service' });
});

module.exports = router;
