import {Router} from 'express';
import * as controllers from '../controllers/tasks.api.controllers.js';
import {validateAccount} from '../../middlewares/tasks.validate.middleware.js';
import {validateToken} from '../../middlewares/token.validate.middleware.js';


const router = Router();

router.post('/tasks', [validateAccount] , controllers.createTask);
router.get('/tasks', [validateToken] , controllers.getTasks);
router.get('/tasks/:id', [validateToken] , controllers.getTask);
router.put('/tasks/:id', [validateToken] , controllers.updateTask);
router.delete('/tasks/:id', [validateToken] , controllers.deleteTask);

