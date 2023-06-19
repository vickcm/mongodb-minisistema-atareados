import  {Router} from 'express';
import * as controllers from '../controllers/challenges.api.controllers.js';
import {validateToken} from '../../middlewares/token.validate.middleware.js';
import {validateChallenge, validateChallengeUpdate} from '../../middlewares/challenges.validate.middleware.js';
import {validateTask} from '../../middlewares/tasks.validate.middleware.js';


const router = Router();
// creo un nuevo desafío
router.post('/desafios', [validateToken, validateChallenge], controllers.createChallenge);
// obtengo los desafíos de un usuario. No necesito parámetro porque el usuario está en el token
router.get('/desafios', [validateToken], controllers.getChallengesByUserId);
router.patch('/desafios/:id', [validateToken, validateChallengeUpdate], controllers.updateChallenge);

// TAREAS DE UN DESAFÍO

router.post('/desafios/:id/tareas', [validateToken, validateTask] , controllers.createTask);
router.get('/desafios/:id/tareas', [validateToken] , controllers.getTasks);

/* router.get('/desafios/tareas', [validateToken] , controllers.getTasks);
router.get('/desafios/tareas/:id', [validateToken] , controllers.getTask);
router.patch('/desafios/tareas/:id', [validateToken] , controllers.updateTask);
router.delete('/desafios/tareas/:id', [validateToken] , controllers.deleteTask); */



export default router;
