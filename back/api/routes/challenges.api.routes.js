import  {Router} from 'express';
import * as controllers from '../controllers/challenges.api.controllers.js';
import {validateToken} from '../../middlewares/token.validate.middleware.js';
import {validateChallenge, validateChallengeUpdate, checkTeamMembership} from '../../middlewares/challenges.validate.middleware.js';
import {validateTask, updateValidateTask} from '../../middlewares/tasks.validate.middleware.js';


const router = Router();
// creo un nuevo desafío
router.post('/desafios', [validateToken, validateChallenge], controllers.createChallenge);

// obtengo los desafíos de un usuario. No necesito parámetro porque el usuario está en el token
router.get('/desafios', [validateToken], controllers.getChallengesByUserId);
router.patch('/desafios/:id', [validateToken, checkTeamMembership, validateChallengeUpdate ], controllers.updateChallenge);
router.get('/desafios/:id', [validateToken, checkTeamMembership], controllers.getChallengeById);

// TAREAS DE UN DESAFÍO

router.post('/desafios/:id/tareas', [validateToken, checkTeamMembership, validateTask ] , controllers.createTask);
router.get('/desafios/:id/tareas', [validateToken, checkTeamMembership] , controllers.getTasks);

// OBTENER Y ACTUALIZAR UNA TAREA
router.get('/desafios/:id/tareas/:idtarea', [validateToken, checkTeamMembership] , controllers.getTaskbyId);
router.patch('/desafios/:id/tareas/:idtarea', [validateToken, checkTeamMembership, updateValidateTask] , controllers.updateTask);

// TAREAS SUGERIDAS
router.get('/sugerenciatareas', [validateToken, checkTeamMembership] , controllers.getSuggestedTasks);  // obtengo las tareas sugeridas para un usuario servicio ext ')

// TABLA DE PUNTOS 

router.get('/desafios/:id/puntos', [validateToken, checkTeamMembership] , controllers.getPoints);  


export default router;
