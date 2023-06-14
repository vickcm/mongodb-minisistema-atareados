import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("DB_ATAREADOS");
const challengesCollection = db.collection("challenges");

async function createChallenge(challenge, account) {
    console.log("Create Challenge:", challenge); 
    console.log("Create Challenge Account: ", account) // Agrega este console.log

}


export { createChallenge };


