'use strict';

const express = require('express');
const allCtrl = require('./controllers/getAll');
const getCtrl = require('./controllers/get');
const delCtrl = require('./controllers/delete');
const postCtrl = require('./controllers/post');
const updateCtrl = require('./controllers/update');

const router = express.Router();

router.get('/users', allCtrl);
router.get('/users/:uuid', getCtrl);
router.delete('/users/:uuid', delCtrl);
router.put('/users/:uuid', updateCtrl);
router.post('/users', postCtrl);

module.exports = router;
