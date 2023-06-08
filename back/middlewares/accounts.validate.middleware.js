import * as accountSchemas from '../schemas/accounts.schemas.js';

async function validateAccount(req, res, next) {
  console.log('Validate Account Request:', req.body); // Agrega este console.log

  try {
    const validatedAccount = await accountSchemas.accountSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    req.body = validatedAccount;
    next();
  } catch (error) {
    res.status(400).json({ error: { message: "Datos de cuenta no válidos", details: error.errors } });
  }
}

export { validateAccount };


