const mongoose = require('mongoose');
const db = require('../models');

mongoose.connect('mongodb://127.0.0.1/expense-db', {
    useNewUrlParser: true,
  });

const expenseSeed = [
    {
        expense_name: 'House Rent',
        expense_category: 'Monthly - Fixed Expense',
        currency_type: 'USD',
        expense_amount: 1400
    },
    {
        expense_name: 'Gas and Electricty Bill',
        expense_category: 'Monthly - Fixed Expense',
        currency_type: 'USD',
        expense_amount: 300
    },
    {
        expense_name: 'Indian Store',
        expense_category: 'Grocery',
        currency_type: 'USD',
        expense_amount: 200
    },
    {
        expense_name: 'Costco',
        expense_category: 'Grocery',
        currency_type: 'USD',
        expense_amount: 5000
    },
    {
        expense_name: 'CVS',
        expense_category: 'Pharmacy' ,
        currency_type: 'USD',
        expense_amount: 100
    }
];

mongoose.connection.once('open', async () => {
    await db.Expense.deleteMany();
    const result = await db.Expense.collection.insertMany(expenseSeed);

    console.log('Expenses seeded!', result);
    process.exit(0);
});

