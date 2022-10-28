const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');

const app = express();
const port = 3000;

app.use(morgan('combined'))
app.get('/', (req, res) => {
  res.send('Hello World! dang xuan chien')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})