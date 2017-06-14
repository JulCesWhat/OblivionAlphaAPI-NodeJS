
import * as express from 'express';
import controller from './controllers/controller'

export default express.Router()
    .get('/:categoryID/:articleID', controller.findArticle)
    .get('/:categoryID', controller.findCategory)
    .get('/', controller.findCategories);
