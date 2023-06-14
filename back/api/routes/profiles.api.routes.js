import  {Router} from 'express';
import { validateToken } from '../../middlewares/token.validate.middleware.js';
import * as controllers from '../controllers/profiles.api.controllers.js';

const router = Router();

router.post('/profiles', validateToken, controllers.createProfile);
/* router.get('/profiles/:id',controllers.getProfile);
router.put('/profiles/:id', controllers.updateProfile);
router.delete('/profiles/:id', controllers.deleteProfile); */


export default router;