

const express = require('express');
const postCtrl = require('./controllers/post');

const router = express.Router();

//const validateUser = require('../lib/validate-user-body');

router.post('/contact/', postCtrl);

module.exports = router;
