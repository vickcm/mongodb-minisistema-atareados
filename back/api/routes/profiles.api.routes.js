import  {Router} from 'express';
import * as controllers from '../controllers/profiles.api.controllers.js';

const router = Router();

router.post('/profiles',  controllers.createProfile);
router.get('/profiles/:id',controllers.getProfile);
router.put('/profiles/:id', controllers.updateProfile);
router.delete('/profiles/:id', controllers.deleteProfile);


export default router;
