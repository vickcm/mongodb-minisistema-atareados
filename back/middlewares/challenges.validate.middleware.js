import { challengeSchema, challengeSchemaUpdate } from '../schemas/challenges.schemas.js';

async function validateChallenge(req, res, next) {

  try {
    const validatedChallenge = await challengeSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    req.body = validatedChallenge;
    next();
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function validateChallengeUpdate(req, res, next) {

  try {
    const validatedChallenge = await challengeSchemaUpdate.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    req.body = validatedChallenge;
    next();
  } catch (error) {
    res.status(400).json({ error });
  }
}



export { validateChallenge, validateChallengeUpdate };