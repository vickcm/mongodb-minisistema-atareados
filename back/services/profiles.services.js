import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("DB_ATAREADOS");
const profilesCollection = db.collection("profiles");

async function createProfile(profile, userId) {
  console.log("Create Profile:", profile); // Agrega este console.log

  await client.connect();

  const profileWithUserId = {
    ...profile,
    userId: new ObjectId(userId)
  };

  const result = await profilesCollection.insertOne(profileWithUserId);
}

export { createProfile };
