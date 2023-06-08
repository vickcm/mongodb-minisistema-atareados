import jwt from "jsonwebtoken";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("DB_ATAREADOS");
const tokensCollection = db.collection("tokens");

async function createToken(account) {
  const token = jwt.sign(account, "secret");
  await client.connect();
  await tokensCollection.insertOne({
    token,
    account_id: new ObjectId(account._id),
  });
  return token;
}


async function verifiedToken(token) {
  try {
    const payload = jwt.verify(token, "secret");
    await client.connect();
    const sessionTokenExist = await tokensCollection.findOne({
      token,
      account_id: new ObjectId(payload._id),
    });
    if (!sessionTokenExist) {
      return null;
    }
    return payload;
  } catch (error) {
    return null;
  }
}

async function deleteToken(token) {
    await client.connect();
    await tokensCollection.deleteOne({ token });
}



export { createToken, verifiedToken, deleteToken };
