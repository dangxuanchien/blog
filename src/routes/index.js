const newsRouter = require("./news");
const meRouter = require("./me");
const courseRouter = require("./courses");
const siteRouter = require("./site");

function route(app) {
  app.use("/news", newsRouter);
  app.use("/me", meRouter);
  app.use("/courses", courseRouter);
  app.use("/", siteRouter);

  // Search
  app.get("/search", (req, res) => {
    res.render("search");
  });

  app.post("/search", (req, res) => {
    res.send("");
  });
}

module.exports = route;
