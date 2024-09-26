const router = require('express').Router();
const Expense = require('../../models/expense');

//Get expenses

router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find();

        if(expenses) {
            res.status(200).send(expenses);
        } else {
            res.status(404).send('No expenses available');
        }
    } catch (e) {
        res.status(500).send('Error on fetching expenses.')
    }
});

module.exports = router;
