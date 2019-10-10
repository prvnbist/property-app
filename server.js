require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');

const users = require('./routes/api/users');
const properties = require('./routes/api/properties');

const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);
app.use(bodyParser.json());
// DB Config
// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
    })
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);
app.use('/api/properties', properties);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`),
);
