import { MongoClient, ObjectId } from "mongodb";
import bcrypt from "bcrypt";
// import { createTransport } from "nodemailer";
import { createTokenTime } from "./token.services.js";
import { transporter } from "./out/mailer.services.js";

const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("DB_ATAREADOS");
const accountsCollection = db.collection("accounts");
const tokensResetCollection = db.collection("tokensReset");

async function createAccount(account) {
  await client.connect();
  const checkAccountExist = await accountsCollection.findOne({
    email: account.email,
  });

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

  const checkAccountExist = await accountsCollection.findOne({
    email: account.email,
  });

  if (!checkAccountExist) {
    throw new Error("No existe una cuenta con ese email");
  }

  // Comparar la contraseña ingresada con la contraseña hasheada almacenada en la base de datos
  const isPasswordCorrect = await bcrypt.compare(
    account.password,
    checkAccountExist.password
  );

  if (!isPasswordCorrect) {
    throw new Error("La contraseña es incorrecta");
  }

  return {
    ...checkAccountExist,
    password: undefined,
  };
}

// Ruta: POST /password/reset
async function sendResetPasswordEmail(email) {
  // Obtener el correo electrónico del cuerpo de la solicitud

  console.log("email:", email);

  // Verificar si el usuario con el correo electrónico proporcionado existe en la base de datos

  await client.connect();

  const user = await accountsCollection.findOne({
    email,
  });

  console.log("user:", user);

  if (!user) {
    throw new Error("No existe una cuenta con ese email");
  }

  // Generar y almacenar un token de restablecimiento de contraseña para el usuario con jwt

  const token = await createTokenTime(user._id);

  console.log("token:", token);

  // Crear el enlace de restablecimiento de contraseña con el token generado

  const resetPasswordLink = `http://localhost:5173/password/reset/${token}`;

  const mailOptions = {
    from: "tu-email@gmail.com",
    to: email,
    subject: "Restablecimiento de Contraseña",
    text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: ${resetPasswordLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error al enviar el correo electrónico:", error);
      throw new Error("Ocurrió un error al enviar el correo electrónico");
    } else {
      console.log("Correo electrónico enviado con éxito:", info.response);
    }
  });

  console.log("Correo electrónico de restablecimiento de contraseña enviado");
}

async function resetPassword(token, newPassword, confirmPassword) {
  // Verificar si el token de restablecimiento de contraseña existe en la base de datos
  await client.connect();
  console.log("token:", token, newPassword, confirmPassword)
  const tokenExist = await tokensResetCollection.findOne({
    token,
  });

  if (!tokenExist) {
    throw new Error("El token de restablecimiento de contraseña no es válido");
  }

  // Verificar si la contraseña y la confirmación de contraseña coinciden
  if (newPassword !== confirmPassword) {
    throw new Error(
      "La contraseña y la confirmación de contraseña no coinciden"
    );
  }

  // Hashear la contraseña antes de almacenarla en la base de datos

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Actualizar la contraseña del usuario en la base de datos
  await accountsCollection.updateOne(
    { _id: new ObjectId(tokenExist.account_id) },
    { $set: { password: hashedPassword } }
  );

  // Eliminar el token de restablecimiento de contraseña de la base de datos
  await tokensResetCollection.deleteOne({
    token,
  });

  console.log("Contraseña actualizada con éxito");
}

export { createAccount, loginAccount, sendResetPasswordEmail, resetPassword };
