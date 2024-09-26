const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1/expense-db', {
      useNewUrlParser: true,
    });

    console.log(`Expense DB is connected on ${conn.connection.host}`);
  } catch (e) {
    console.error('Error - could not connect to database', e.message);
  }
};

module.exports = connectDB;
