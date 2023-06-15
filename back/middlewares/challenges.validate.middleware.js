import * as challengesSchema from '../schemas/challenges.schemas.js';


function validateChallenge(req, res, next) {
    const { body } = req;
  
    challengesSchema.validate(body)
      .then(() => {
        next();
      })
      .catch((error) => {
        res.status(400).json({ error: { message: error.message } });
      });
  }
  
  export { validateChallenge };