const router = require('express').Router();
const Expense = require('../../models/expense');

//Get expenses
/**
 * @desc Get all expenses
 */
router.get('/', async (req, res) => {
    try {
        let result;

        const category = req.query.category;
        const currency = req.query.currency;

        if(category) {
            result = await Expense.find({expense_category: category});
        }
        
        if(currency) {
            result = await Expense.find({currency_type: currency});
        } else {
            result = await Expense.find();
        }
         

        if(result) {
            res.status(200).send(result);
        } else {
            res.status(404).send('No expenses available');
        }
    } catch (e) {
        res.status(500).send('Error on fetching expenses.')
    }
});

module.exports = router;
