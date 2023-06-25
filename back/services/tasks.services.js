import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("DB_ATAREADOS");
const tasksCollection = db.collection("tasks");
const challengesCollection = db.collection("challenges");


async function createTask(task, challengeId) {


  await client.connect();

  // Preparo la tarea con las propiedades adicionales
  const newTask = {
    ...task,
    isComplete: false,
    createdAt: new Date(),
  };

  // Inserto la tarea en su colección
  const insertedTask = await tasksCollection.insertOne(newTask);

  // Obtengo el ID de la tarea creada
  const taskId = insertedTask.insertedId;

  // Guardo el ID de la tarea en el desafío
  await challengesCollection.updateOne(
    { _id: new ObjectId(challengeId) },
    { $push: { tasks: taskId } }
  );

  // Cierro la conexión con la base de datos
  return newTask;

}

async function getTasks(challengeId) {
    await client.connect();
    const challenge = await challengesCollection.findOne({ _id: new ObjectId(challengeId) });
    const tasksIds = challenge.tasks;
    const tasks = await tasksCollection.find({ _id: { $in: tasksIds } }).toArray();
    return tasks;
}

async function updateTask(challengeId, taskId, task) {


  await client.connect();
  await tasksCollection.updateOne({ _id: new ObjectId(taskId) }, { $set: task });


  if (task.isComplete) {
    const { points, responsible } = task;


    // Buscar el desafío en la colección de desafíos
    const desafio = await challengesCollection.findOne({ _id: new ObjectId(challengeId) });

    if (!desafio) {
      throw new Error("Desafío no encontrado");
    }

    // Buscar al responsable de la tarea en la lista de miembros del desafío
    const responsableDesafio = desafio.members.find((member) => member.username === responsible);


    if (!responsableDesafio) {
      throw new Error("Responsable de la tarea no encontrado en los miembros del desafío");
    }

    // Sumar los puntos de la tarea al total del responsable
    responsableDesafio.points = responsableDesafio.points + points;
    console.log("points de la tarea:", points )
    console.log("responsableDesafio:", responsableDesafio.points )
    console.log ("Responsable encontrado:", responsableDesafio);


    // Actualizar el desafío con el nuevo total del responsable
    await challengesCollection.updateOne(
      { _id: new ObjectId(challengeId) },
      { $set: { members: desafio.members } }
    );
  }

  return task;
}

async function getTaskById(taskId) {
  await client.connect();
  const task = await tasksCollection.findOne({ _id: new ObjectId(taskId) });
  
  if (!task) {
    // Si no se encuentra ninguna tarea, puedes devolver un valor predeterminado o lanzar una excepción
    // Aquí hay un ejemplo de devolución de un valor predeterminado (un objeto vacío)
    return {};
  }

  return task;

}






export { createTask, getTasks, updateTask, getTaskById };
