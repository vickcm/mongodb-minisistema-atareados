import  {Router} from 'express';
import * as controllers from '../controllers/challenges.api.controllers.js';
import {validateToken} from '../../middlewares/token.validate.middleware.js';
import {validateChallenge} from '../../middlewares/challenges.validate.middleware.js';


const router = Router();

router.post('/desafio', [validateToken], controllers.createChallenge);

export default router;
