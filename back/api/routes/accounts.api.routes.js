import {Router} from 'express';
import * as controllers from '../controllers/accounts.api.controllers.js';
import {validateAccount, validateLogin} from '../../middlewares/accounts.validate.middleware.js';
import {validateToken} from '../../middlewares/token.validate.middleware.js';


const router = Router();

router.post('/accounts', [validateAccount] , controllers.createAccount);

router.post('/session', [validateLogin], controllers.loginAccount);
router.delete('/session', [validateToken], controllers.logoutAccount);
router.post('/password/reset', controllers.sendResetPasswordEmail);
// router.post('/password/reset/:token', controllers.resetPassword);



export default router;
