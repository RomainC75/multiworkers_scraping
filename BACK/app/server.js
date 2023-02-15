const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const { handle404 } = require('./controllers/errors');

require('./db/init')()
require('dotenv').config()

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');


app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/scrape',require('./router/scrape.router'))
app.use('/hello',require('./router/hello.router'))

app.use(handle404);

app.listen(5000);