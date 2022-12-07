class NewsController {
  // [GET] /news
  index(req, res) {
    console.log('news');
    res.render('news');
  }

  // [GET] /news/:slug
  show(req, res) {
    console.log('test', req);
    res.send('test chức năng create router');
  }
}

module.exports = new NewsController();
