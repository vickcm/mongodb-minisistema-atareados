import { taskSchema } from '../schemas/tasks.schemas.js';

async function validateTask(req, res, next) {
  console.log('Validate Challenge Request:', req.body);

  try {
    const validatedTask = await taskSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    req.body = validatedTask;
    next();
  } catch (error) {
    res.status(400).json({ error });
  }
}

export { validateTask };
