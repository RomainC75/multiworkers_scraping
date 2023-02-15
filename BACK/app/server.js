const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require('./db/init')()
const app = express();
require('dotenv').config()


app.set('view engine', 'ejs');
app.set('views', './views');

const { handle404 } = require('./controllers/errors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/scrape',require('./router/scrape.router'))

app.use(handle404);

app.listen(5000);