import {Router} from 'express';
import * as controllers from '../controllers/accounts.api.controllers.js';
import {validateAccount} from '../../middlewares/accounts.validate.middleware.js';
import {validateToken} from '../../middlewares/token.validate.middleware.js';


const router = Router();

router.post('/accounts', [validateAccount] , controllers.createAccount);

router.post('/session', [validateAccount], controllers.loginAccount);
router.delete('/session', [validateToken], controllers.logoutAccount);


export default router;
