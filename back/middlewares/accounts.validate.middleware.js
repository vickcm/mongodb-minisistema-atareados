import * as accountSchemas from '../schemas/accounts.schemas.js';

async function validateAccount(req, res, next) {

  try {
    const validatedAccount = await accountSchemas.accountSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    req.body = validatedAccount;
    next();
  } catch (error) {
    res.status(400).json({ error })
  }
}

async function validateLogin(req, res, next) {

  try {
    const validatedAccount = await accountSchemas.loginAccountSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    req.body = validatedAccount;
    next();
  } catch (error) {
    res.status(400).json({ error })
  }
}

export { validateAccount, validateLogin };


