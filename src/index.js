const express = require('express');
const morgan = require('morgan');
const path = require('path');
const handlebars = require('express-handlebars');

const app = express();
const port = 3000;

// HTML loger
// app.use(morgan('combined'))

/* Setting using Static file - file tĩnh */
app.use(express.static(path.join(__dirname, 'public')));


// Template engine
app.engine('hbs', handlebars.engine({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

console.log('dirname', path.join(__dirname, 'resources/views'));
app.get('/', (req, res) => {
  res.render('home');
})

/*Basic Routing */
app.get('/news', (req, res) => {
  res.render('news');
})
// Search
app.get('/search', (req, res) => {
  console.log('req', req.query.q)
  res.render('search');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})