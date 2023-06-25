import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("DB_ATAREADOS");
const accountsCollection = db.collection("accounts");

async function createAccount(account) {

  await client.connect();
  const checkAccountExist = await accountsCollection.findOne({ email: account.email });

  if (checkAccountExist) {
    throw new Error("Ya existe una cuenta con ese email");
  }

  // Hashear la contraseña antes de almacenarla en la base de datos
  const hashedPassword = await bcrypt.hash(account.password, 10);

  // Crear un nuevo objeto de cuenta con la contraseña hasheada
  const accountWithHashedPassword = {
    ...account,
    password: hashedPassword,
  };

  const result = await accountsCollection.insertOne(accountWithHashedPassword);
}

async function loginAccount(account) {
    await client.connect();

    const checkAccountExist = await accountsCollection.findOne({ email: account.email });

    if (!checkAccountExist) {
        throw new Error("No existe una cuenta con ese email");
    }

    // Comparar la contraseña ingresada con la contraseña hasheada almacenada en la base de datos
    const isPasswordCorrect = await bcrypt.compare(account.password, checkAccountExist.password);

    if (!isPasswordCorrect) {
        throw new Error("La contraseña es incorrecta");
    }

    return {
        ... checkAccountExist, 
        password: undefined
        
    }

 }   



export { createAccount, loginAccount };

