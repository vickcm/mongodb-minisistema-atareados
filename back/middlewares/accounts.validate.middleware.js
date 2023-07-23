import * as accountSchemas from "../schemas/accounts.schemas.js";

async function validateAccount(req, res, next) {
  try {
    const validatedAccount = await accountSchemas.accountSchema.validate(
      req.body,
      {
        abortEarly: false,
        stripUnknown: true,
      }
    );

    req.body = validatedAccount;
    next();
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function validateLogin(req, res, next) {
  try {
    const validatedAccount = await accountSchemas.loginAccountSchema.validate(
      req.body,
      {
        abortEarly: false,
        stripUnknown: true,
      }
    );

    req.body = validatedAccount;
    next();
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function validateResetPassword(req, res, next) {
  try {
    // Validar el cuerpo de la solicitud utilizando el esquema
    const validatedAccount = await accountSchemas.resetPasswordSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    // Asignar el cuerpo de la solicitud validado a req.body
    req.body = validatedAccount;
    next();
  } catch (error) {
    const errorMessage = error.message;
    // Si hay errores de validación, enviar una respuesta de error con el código de estado 400
    // Enviar una respuesta de error con el código de estado 400 y el mensaje de error
    res.status(400).json({ error: errorMessage });
  }
}

export { validateAccount, validateLogin, validateResetPassword };
