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
    console.log('Invalid Members:', invalidMembers);
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
    console.log('Member:', email);

    const user = await getUserByEmail(email);
    console.log('User:', user);
    if (user) {
      console.log('Valid Member:', user.email);
      console.log('UserName: ', user.username);
      
      return user;
    } else {
      invalidMembers.push(email);
      console.log('Invalid Member:', email);
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





export { createChallenge, getChallengesByUserId, updateChallenge };
