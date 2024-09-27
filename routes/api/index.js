const router = require('express').Router();
const expenseRoutes =  require('./expense');

router.use('/expenses', expenseRoutes);

module.exports = router;