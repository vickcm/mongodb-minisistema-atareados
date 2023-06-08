import * as services from "../../services/accounts.services.js";
import * as tokenServices from "../../services/token.services.js";

async function createAccount(req, res) {
  console.log(req.body);
  return services
    .createAccount(req.body)
    .then((response) => {
      console.log("Create Account Response:", response); // Agrega este console.log
      res
        .status(200)
        .send({ message: "Cuenta creada exitosamente", data: response });
    })
    .catch((error) => {
      console.log("Create Account Error:", error); // Agrega este console.log
      res.status(400).json({ error: { message: error.message } });
    });
}

async function loginAccount(req, res) {
  try {
    const account = await services.loginAccount(req.body);
    console.log(account);

    const responseAccount = {
      token: await tokenServices.createToken(account),
      account
    };
    console.log("Login Account Response:", responseAccount);

    res.status(200).send({ message: "Login realizado con éxito", data: responseAccount });
  } catch (error) {
    console.log("Login Account Error:", error);
    
    if (error.message === "No existe una cuenta con ese email") {
      res.status(400).json({ error: { message: "El email ingresado no existe" } });
    } else if (error.message === "La contraseña es incorrecta") {
      res.status(400).json({ error: { message: "La contraseña ingresada es incorrecta" } });
    } else {
      res.status(500).json({ error: { message: "Error en el servidor" } });
    }
  }
}


async function logoutAccount(req, res) {
  const token = req.headers["auth-token"];

  return tokenServices.deleteToken(token)
    .then(() => {
      res.status(200).send({ message: "Logout realizado con éxito " });
    })
    .catch((error) => {
      console.log("Logout Account Error:", error); // Agrega este console.log
      res.status(400).json({ error: { message: err.message } });
    });
}

export { createAccount, loginAccount, logoutAccount };
