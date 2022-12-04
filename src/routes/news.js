const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

// router.use('/:user_id', newsController.show);

router.use('/:slug', newsController.show);
router.use('/', newsController.index);

module.exports = router;
