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
    const tasks = await tasksCollection.find({ _id: { $in: tasksIds }, isDeleted: { $ne: true } }).toArray();
    return tasks;
}

async function updateTask(challengeId, taskId, task) {
  
  await client.connect();

  // Obtener el estado anterior de la tarea antes de la edición
  const prevTask = await tasksCollection.findOne({ _id: new ObjectId(taskId) });

  if (task.isDeleted === true) {
    await tasksCollection.updateOne(
      { _id: new ObjectId(taskId) },
      { $set: { isDeleted: true } }
    );
    console.log("Tarea eliminada:", task.isDeleted);
    return task;
  }

  await tasksCollection.updateOne({ _id: new ObjectId(taskId) }, { $set: task });

  const { isComplete, points, responsible } = task;

  // Comparar si la tarea cambió de estado (completa a no completa o viceversa)
  if (prevTask.isComplete !== isComplete) {
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

    if (isComplete) {
      // Si la tarea se completó, sumar los puntos al total del responsable
      responsableDesafio.points = responsableDesafio.points + points;
    } else {
      // Si la tarea no se completó, restar los puntos al total del responsable
      responsableDesafio.points = responsableDesafio.points - points;
      if (responsableDesafio.points < 0) {
        responsableDesafio.points = 0;
      }
    }

    console.log("Puntos de la tarea:", points);
    console.log("Total de puntos del responsable:", responsableDesafio.points);
    console.log("Responsable encontrado:", responsableDesafio);

    // Actualizar el desafío con el nuevo total del responsable
    await challengesCollection.updateOne(
      { _id: new ObjectId(challengeId) },
      { $set: { members: [...desafio.members] } } // Copia del array de miembros
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
