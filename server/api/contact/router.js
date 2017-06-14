
import * as express from 'express';
import controller from './controllers/controller'

export default express.Router()
    .post('/', controller.sendEmail);
