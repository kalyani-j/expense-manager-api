const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    expense_date:{ 
      type: Date,
    },
    expense_name: {
      type: String,
    },
    expense_category: {
      type: String,
    },
    currency_type: {
      type: String,
    },
    expense_amount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model('expense', expenseSchema);

module.exports = Expense;
