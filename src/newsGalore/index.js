

const express = require('express');
const getArticleCtrl = require('./controllers/getArticle');
const getCategoryCtrl = require('./controllers/getCategory');
const getCategoriesCtrl = require('./controllers/getCategories');

const router = express.Router();

router.get('/:categoryID/:articleID', getArticleCtrl);
router.get('/:categoryID', getCategoryCtrl);
router.get('/', getCategoriesCtrl);


module.exports = router;
