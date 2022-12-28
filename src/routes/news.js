const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

// router.use('/:user_id', newsController.show);

router.get('/:slug', newsController.show);
router.get('/', newsController.index);

module.exports = router;
