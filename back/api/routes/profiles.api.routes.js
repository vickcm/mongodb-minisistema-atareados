import  {Router} from 'express';
import { validateToken } from '../../middlewares/token.validate.middleware.js';
import * as controllers from '../controllers/profiles.api.controllers.js';

const router = Router();

router.post('/profiles', validateToken, controllers.createProfile);

// para hacer: validar profile con schema 
router.get('/profiles', validateToken, controllers.getProfile);

export default router;

/* router.get('/profiles/:id',controllers.getProfile);
router.put('/profiles/:id', controllers.updateProfile);
router.delete('/profiles/:id', controllers.deleteProfile); */
