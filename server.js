const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/data', (req, res) => res.send({data: 'Praveen Bisht'}))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))