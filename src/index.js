const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');

const app = express();
const port = 3000;

const route = require('./routes');

// need import for connect DB
const db = require('./config/db');

// Connect to DB
db.connect();

// HTML loger
// app.use(morgan('combined'))

/* Setting using Static file - file tĩnh */
app.use(express.static(path.join(__dirname, 'public')));

// when send data = form, using urlencoded
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// when send data = librari (axios, fetch...) using json
app.use(express.json());

// Template engine
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
