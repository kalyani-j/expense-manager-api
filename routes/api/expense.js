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
    const expDate = req.query.date;

    if (category) {
      result = await Expense.find({ expense_category: category });
    }

    if (currency) {
      result = await Expense.find({ currency_type: currency });
    }

    if (date) {
      result = await Expense.find({ expense_date: expDate});
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

    //aggregation pipeline
    /**
     * @description Get total expenses by:
     *      - Date
     *      - Category
     *      - Currency
     * @path /api/expenses/aggregate?group=currency_type
     */

    router.get('/aggregate', async(req, res) => {
        try {

            const groupParam = req.query.group;
            const result = await Expense.aggregate(
                [
                    {
                      '$group': {
                        '_id': `$${groupParam}`, 
                        'total_expense': {
                          '$sum': '$expense_amount'
                        }
                      }
                    }
                  ]
            )
                


            if(result) {
                res.status(200).send(result);
            } else {
                res.status(404).send('Aggregation error.')
            }
        } catch (e) {
            res.status(500).send('Error on fetching expenses.');
          }
    })

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

/**
 * @desc Create an expense
 */
router.post('/', async (req, res) => {
  try {
    const result = await Expense.create(req.body);

    if (result) {
      res.status(201).send('Expense successfully added.');
    } else {
      res.status(404).send('Expense not added.');
    }
  } catch (e) {
    res.send(e.message);
  }
});


/**
 * @desc delete an expense by ID
 */
router.delete('/:id', async (req, res) => {
  try {
    const result = await Expense.findByIdAndDelete({ _id: req.params.id });

    if (result) {
      res.status(201).json({ success: true, data: {} });
      //   ('Expense successfully deleted.');
    } else {
      res.status(404).send('Expense not found.');
    }
  } catch (e) {
    res.status(500).send('Error on deleting expense.');
  }
});

module.exports = router;
