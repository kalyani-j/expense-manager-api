const router = require('express').Router();
const Expense = require('../../models/expense');

//Get expenses
/**
 * @desc Get all expenses or get expenses by date, currency and category
 */
router.get('/', async (req, res) => {
  try {
    let result;

    const category = req.query.category;
    const currency = req.query.currency;
    const date = req.query.date;

    if (category) {
      result = await Expense.find({ expense_category: category });
    }

    if (currency) {
      result = await Expense.find({ currency_type: currency });
    }

    if (date) {
      result = await Expense.find({ currency_type: currency });
    } else {
      result = await Expense.find();
    }

    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send('No expenses available');
    }
  } catch (e) {
    res.status(500).send('Error on fetching expenses.');
  }
});

/**
 * @desc Update an expense by ID
 * @param id
 */
router.put('/', async (req, res) => {
  try {
    const result = await Expense.findByIdAndUpdate(
      { _id: req.query.id },
      req.body,
      { new: true }
    );

    if (result) {
      res.status(201).send(result);
    } else {
      res.status(404).send('Expense not found.');
    }
  } catch (e) {
    res.status(500).send('Error on updating expense.');
    console.error(e);
  }
});

module.exports = router;
