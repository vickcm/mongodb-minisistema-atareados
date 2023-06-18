import  {Router} from 'express';
import * as controllers from '../controllers/challenges.api.controllers.js';
import {validateToken} from '../../middlewares/token.validate.middleware.js';
import {validateChallenge} from '../../middlewares/challenges.validate.middleware.js';


const router = Router();
// creo un nuevo desafío
router.post('/desafios', [validateToken, validateChallenge], controllers.createChallenge);

// obtengo los desafíos de un usuario. No necesito parámetro porque el usuario está en el token
router.get('/desafios', [validateToken], controllers.getChallengesByUserId);

export default router;
