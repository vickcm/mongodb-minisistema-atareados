import { taskSchema, updateTaskSchema } from '../schemas/tasks.schemas.js';

async function validateTask(req, res, next) {

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

async function updateValidateTask(req, res, next) {

  try {
    const validatedTask = await updateTaskSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });
    req.body = validatedTask;
    next();
  } catch (error) {
    res.status(400).json({ error });
  }
}

export { validateTask, updateValidateTask };
