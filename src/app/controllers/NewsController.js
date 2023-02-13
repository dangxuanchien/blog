const Course = require("../models/Course");

class NewsController {
  // [GET] /news
  index(req, res) {
    Course.find({}, function (err, course) {
      if (!err) {
        return res.json(course);
      }
      return res.status(404).json({ error: 'err message' });
    });

    // render json when connect url
    // res.json({
    //   name: 'test',
    // })
  
    // res.render('news');
  }

  // [GET] /news/:slug
  show(req, res) {
    console.log('test', req);
    res.send('test chức năng create router');
  }
}

module.exports = new NewsController();
