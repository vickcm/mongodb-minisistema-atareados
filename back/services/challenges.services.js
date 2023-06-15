import { MongoClient, ObjectId } from "mongodb";
import { getUserByEmail } from "./profiles.services.js";
const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("DB_ATAREADOS");
const challengesCollection = db.collection("challenges");

async function createChallenge(challenge) {
  const { title, deadline, members } = challenge;

  // Verificar que los usuarios correspondan a usuarios registrados
  const { validMembers, invalidMembers } = await validateMembers(members);

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

export { createChallenge };
