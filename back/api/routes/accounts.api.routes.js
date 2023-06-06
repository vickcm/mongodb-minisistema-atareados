import {Router} from 'express';
import * as controllers from '../controllers/accounts.api.controllers.js';
import {validateAccount} from '../../middlewares/accounts.validate.middleware.js';

const router = Router();

router.post('/accounts', [validateAccount] , controllers.createAccount);
// router.get('/accounts', controllers.getAccounts);

router.post('/session', [validateAccount], controllers.loginAccount);

export default router;
