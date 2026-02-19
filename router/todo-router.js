import express from 'express';
import controller from '../controller/todo-controller.js';

const router = express.Router();

router.get('/', controller.index);

router.get('/:id', controller.show);

router.post('/', controller.create);


export default router;
