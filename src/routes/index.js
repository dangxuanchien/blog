const newsRouter = require('./news');

function route(app) {
  app.use('/news', newsRouter);

  app.use('/', (req, res) => {
    res.render('home');
  });

  // Search
  app.get('/search', (req, res) => {
    res.render('search');
  });

  app.post('/search', (req, res) => {
    res.send('');
  });
}

module.exports = route;
