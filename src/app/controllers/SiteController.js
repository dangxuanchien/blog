const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");
class SiteController {
  // [GET] http://localhost:3000/
  index(req, res, next) {
    // how to write code compact when using promises
    Course.find({})
      .then(courses => {
        res.render('home', {
          courses: mutipleMongooseToObject(courses)
        })
      })
      .catch(next);
  }

  // [GET] /news/:slug
  show(req, res) {
    console.log('test', req);
    res.send('test chức năng create router');
  }
}

module.exports = new SiteController();
