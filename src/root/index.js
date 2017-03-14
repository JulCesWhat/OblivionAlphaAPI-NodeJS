'use strict';

var express = require('express');
var getCtrl = require('./controllers/get');

var router = express.Router();

router.get('/', getCtrl);

module.exports = router;
