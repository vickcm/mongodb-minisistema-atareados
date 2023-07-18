import * as challengeService from "../../services/challenges.services.js";
import * as taskService from "../../services/tasks.services.js";
import * as openAiService from "../../services/out/openai.services.js";


async function createChallenge(req, res) {

  const challenge = req.body;
  const account = req.account;

  return challengeService
    .createChallenge(challenge, account)
    .then(() => {
      res.status(201).json({ message: "Desafío creado exitosamente." });
    })
    .catch((err) => {
      res.status(400).json({ error: { message: err.message } });
    });
}

async function getChallengesByUserId(req, res) {
  const account = req.account;

  return challengeService
    .getChallengesByUserId(account._id)
    .then((challenges) => {
      res.status(200).json(challenges);
    })
    .catch((err) => {
      res.status(400).json({ error: { message: err.message } });
    });
}

async function updateChallenge(req, res) {
  const challenge = req.body;
  const id = req.params.id;
  return challengeService
    .updateChallenge(challenge, id)
    .then(() => {
      res.status(201).json({ message: "Desafío actualizado exitosamente." });
    })
    .catch((err) => {
      res.status(400).json({ error: { message: err.message } });
    });
}

async function createTask(req, res) {
  const task = req.body;
  const challengeId = req.params.id;
  return taskService
    .createTask(task, challengeId)
    .then(() => {
      res.status(201).json({ message: "Tarea creada exitosamente." });
    })
    .catch((err) => {
      res.status(400).json({ error: { message: err.message } });
    });
}

async function getTasks(req, res) {
    const challengeId = req.params.id;
    return taskService
        .getTasks(challengeId)
        .then((tasks) => {
            res.status(200).json(tasks);
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } });
        });
}

async function getChallengeById(req, res) {
    const challengeId = req.params.id;
    return challengeService.getChallengeById(challengeId)
        .then((challenge) => {
            res.status(200).json(challenge);
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } });
        });
}

async function updateTask(req, res) {
  const taskId = req.params.idtarea;
  const task = req.body;
  const challengeId = req.params.id;
    return taskService
        .updateTask(challengeId, taskId, task)
        .then(() => {
            res.status(201).json({ message: "Tarea actualizada exitosamente." });
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } });
        });
}

async  function getTaskbyId(req, res) {
    const taskId = req.params.idtarea;
    return taskService.getTaskById(taskId)
        .then((task) => {
            res.status(200).json(task);
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } });
        });
}





async function getSuggestedTasks(req, res) {
    const account = req.account;
    console.log("account", account);
    return openAiService.getSuggestedTasks(account._id)
        .then((tasks) => {
            res.status(200).json(tasks);
        })
        .catch((err) => {
            res.status(400).json({ error: { message: err.message } });
        });
}


async function getPoints(req, res) {
  const challengeId = req.params.id;
  console.log("challengeId", challengeId);
  return challengeService.getPoints(challengeId)
      .then((points) => {
          res.status(200).json(points);
      })
      .catch((err) => {
          res.status(400).json({ error: { message: err.message } });
      });
}


  
  
  export { createChallenge, getChallengesByUserId, updateChallenge, createTask, getTasks, getChallengeById, updateTask, getTaskbyId, getSuggestedTasks, getPoints};
