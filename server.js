const express = require('express');
const connectDB = require('./db');
const routes = require('./routes');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

//Connect to database
connectDB();

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`App listening on ${PORT}`);
  } else {
    console.error(error.message);
  }
});

//Body parser
app.use(express.json());

// Routes
app.use(routes);

app.get('/', (req, res) => {
  res.status(200);
  res.send('Welcome to expense manager api');
});
