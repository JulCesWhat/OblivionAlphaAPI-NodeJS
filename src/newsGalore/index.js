

const express = require('express');
const getArticleCtrl = require('./controllers/getArticle');
const getCategoryCtrl = require('./controllers/getCategory');
const getCategoriesCtrl = require('./controllers/getCategories');

const router = express.Router();

router.get('/newsGalore/:categoryID/:articleID', getArticleCtrl);
router.get('/newsGalore/:categoryID', getCategoryCtrl);
router.get('/newsGalore', getCategoriesCtrl);


module.exports = router;
