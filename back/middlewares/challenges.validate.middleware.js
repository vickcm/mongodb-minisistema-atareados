import { challengeSchema, challengeSchemaUpdate } from '../schemas/challenges.schemas.js';
import * as challengeService from '../services/challenges.services.js';

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

async function checkTeamMembership(req, res, next) {
  try {
    const challengeId = req.params;
    const challenge = await challengeService.getChallengeById(challengeId); // Busca el desafío por ID en la base de datos

    if (!challenge) {
      // El desafío no existe
      return res.status(404).json({ error: 'Desafío no encontrado' });
    }

    // Obtén el usuario logueado desde req.account (asumiendo que fue asignado en el middleware validateToken)
    const loggedInUser = req.account;

    // Verifica si el usuario logueado pertenece al equipo del desafío
    const isMember = await challengeService.checkMembership(challengeId, loggedInUser);

    if (isMember) {
      // El usuario es miembro del equipo, puedes permitir el acceso
      next();
    } else {
      // El usuario no es miembro del equipo, devuelve un error de acceso no autorizado
      res.status(403).json({ error: 'Acceso no autorizado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


export { validateChallenge, validateChallengeUpdate, checkTeamMembership };