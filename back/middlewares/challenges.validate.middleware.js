import { challengeSchema, challengeSchemaUpdate } from '../schemas/challenges.schemas.js';

async function validateChallenge(req, res, next) {
  console.log('Validate Challenge Request:', req.body);

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
  console.log('Validate Challenge Update Request:', req.body);

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