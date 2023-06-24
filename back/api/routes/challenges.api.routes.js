import  {Router} from 'express';
import * as controllers from '../controllers/challenges.api.controllers.js';
import {validateToken} from '../../middlewares/token.validate.middleware.js';
import {validateChallenge, validateChallengeUpdate} from '../../middlewares/challenges.validate.middleware.js';
import {validateTask, updateValidateTask} from '../../middlewares/tasks.validate.middleware.js';


const router = Router();
// creo un nuevo desafío
router.post('/desafios', [validateToken, validateChallenge], controllers.createChallenge);
// obtengo los desafíos de un usuario. No necesito parámetro porque el usuario está en el token
router.get('/desafios', [validateToken], controllers.getChallengesByUserId);
router.patch('/desafios/:id', [validateToken, validateChallengeUpdate], controllers.updateChallenge);
router.get('/desafios/:id', [validateToken], controllers.getChallengeById);

// TAREAS DE UN DESAFÍO

router.post('/desafios/:id/tareas', [validateToken, validateTask] , controllers.createTask);
router.get('/desafios/:id/tareas', [validateToken] , controllers.getTasks);
router.get('/desafios/:id/tareas/:idtarea', [validateToken] , controllers.getTaskbyId);

router.patch('/desafios/:id/tareas', [validateToken, updateValidateTask] , controllers.updateTask);

// TAREAS SUGERIDAS
router.get('/sugerenciatareas', [validateToken] , controllers.getSuggestedTasks);  // obtengo las tareas sugeridas para un usuario servicio ext ')




export default router;
