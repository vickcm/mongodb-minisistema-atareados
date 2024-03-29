import jwt from "jsonwebtoken";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("DB_ATAREADOS");
const tokensCollection = db.collection("tokens");
const tokensResetCollection = db.collection("tokensReset");

async function createToken(account) {
  const token = jwt.sign(account, "secret");
  await client.connect();
  await tokensCollection.insertOne({
    token,
    account_id: new ObjectId(account._id),
  });
  return token;
}

async function createTokenTime(userId) {
  const payload = { userId: userId };
  const secretKey = "secret";
  const expiresIn = "2h"; // Duración de 2 horas

  const token = jwt.sign(payload, secretKey, { expiresIn, subject: 'reset' });

  const tokenObject = {
    token: token,
    account_id: new ObjectId(userId),
  };

  await client.connect();
  await tokensResetCollection.createIndex(
    { createdAt: 1 },
    { expireAfterSeconds: 7200 }
  );

  await tokensResetCollection.insertOne(tokenObject);
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

export { createToken, verifiedToken, deleteToken, createTokenTime };
