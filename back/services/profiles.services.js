import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("DB_ATAREADOS");
const profilesCollection = db.collection("profiles");

async function createProfile(profile, account) {
  console.log("Create Profile:", profile); // Agrega este console.log

  const profileWithUserId = {
    ...profile,
    email: account.email,
    _id: new ObjectId(account._id),
  };
  await client.connect();

  const checkProfile = await profilesCollection.findOne(profileWithUserId);

  if (checkProfile) {
    throw new Error("Ya tiene un perfil creado");
  }

  await profilesCollection.insertOne(profileWithUserId);
}

async function getProfiles(idProfile) {
  await client.connect();

  const profile = await profilesCollection.findOne({
    _id: new ObjectId(idProfile),
  });

  if (!profile) {
    throw new Error("Esta cuenta no tiene un perfil asociado.");
  }

  return profile;
}

async function getUserByEmail(email) {
  
  await client.connect();

  const user = await profilesCollection.findOne({ email });

  if (user) {
    console.log('User:', user); // Agrega este console.log    
    return user;

  }

  return null;
}

export { createProfile, getProfiles, getUserByEmail };
