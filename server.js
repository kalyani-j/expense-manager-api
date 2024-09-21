const express = require("express");

const app = express();
const PORT = 3000;

app.listen(PORT, (error)=> {
    if(!error) {
        console.log(`App listening on ${PORT}`);
    } else {
        console.error(error.message);
    }
})

app.get('/', (req, res) => {
    res.status(200);
    res.send("Welcome to expense manager api");
})