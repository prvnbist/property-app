const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());
  // DB Config
  const db = require("./config/keys").mongoURI;
  // Connect to MongoDB
  mongoose
    .connect(
      db,
      { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

app.get('/yo', (req,res) => res.send({yo: "Me"}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))