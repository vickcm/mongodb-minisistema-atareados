import { MongoClient, ObjectId } from "mongodb";
import { getUserByEmail, getProfileByUserId } from "./profiles.services.js";
const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("DB_ATAREADOS");
const challengesCollection = db.collection("challenges");

async function createChallenge(challenge, account) {
  const { title, deadline, members } = challenge;

  const authenticatedUser = account; // Reemplaza req.account por el objeto que contiene los datos del usuario registrado

  const profileAuthenticatedUser = await getProfileByUserId(
    authenticatedUser._id
  );

  // Verificar que los usuarios correspondan a usuarios registrados
  const { validMembers, invalidMembers } = await validateMembers(members);

   // Agregar el perfil del usuario autenticado al array validMembers
   validMembers.unshift(profileAuthenticatedUser);

  if (invalidMembers.length > 0) {
    throw new Error(
      `Los siguientes usuarios no están registrados: ${invalidMembers.join(", ")}`
    );
  }
  const createdAt = Date.now();
  // Guardar el desafío en la colección de desafíos
  const challengeData = {
    title,
    deadline,
    members: validMembers,
    tasks: [],
    created_at: createdAt,
  };

  await client.connect();

  const createdChallenge = await challengesCollection.insertOne(challengeData);
  return createdChallenge;
}

async function validateMembers(members) {
  const validMembers = [];
  const invalidMembers = [];
  await client.connect();

  const validateMember = async (email) => {

    const user = await getUserByEmail(email);
    if (user) {

      return user;
    } else {
      invalidMembers.push(email);
    }
  };

  const validatedMembers = await Promise.all(members.map(validateMember));
  const filteredMembers = validatedMembers.filter(Boolean);
  validMembers.push(...filteredMembers);

  return { validMembers, invalidMembers };
}

async function getChallengesByUserId(userId) {
  await client.connect();

  const challenges = await challengesCollection
    .find({ "members._id": new ObjectId(userId) })
    .toArray();

  return challenges;
}

async function updateChallenge(challenge, id) {
  const { title, deadline } = challenge;
  const challengeId = new ObjectId(id);
  const challengeData = {
    title,
    deadline,
  };

  await client.connect();

  const updatedChallenge = await challengesCollection.updateOne(
    { _id: challengeId },
    { $set: challengeData }
  );
  return updatedChallenge;
}

async function getChallengeById(id) {
  const challengeId = new ObjectId(id);
  
  await client.connect();

  const challenge = await challengesCollection.findOne({ _id: challengeId });

  // chequear si existe el challenge sino devolver null o un error

  if(!challenge) {
    return null;
  } 

  return challenge;
}

async function getPoints(challengeId) {

  
  await client.connect();

  const challenge = await challengesCollection.findOne({ _id: challengeId });

  // Chequear si existe el challenge, sino devolver null o un error
  if (!challenge) {
    return null;
  }

  // Recorrer el array de members y devolver un array de objetos con el nombre y los puntos de cada uno
  const pointsArray = challenge.members.map((member) => {
    return {
      username: member.username,
      points: member.points,
    };
  });

  console.log(pointsArray);

  return pointsArray;
}

async function checkMembership(challengeId, user) {

  challengeId = new ObjectId(challengeId);

  const challenge = await getChallengeById(challengeId);

  if (!challenge) {
    return false;
  }

  const member = challenge.members.find((member) => {
    return member._id.toString() === user._id.toString();
  });

  if (!member) {
    return false;
  }

  return true;
}






export { createChallenge, getChallengesByUserId, updateChallenge, getChallengeById, getPoints, checkMembership };
