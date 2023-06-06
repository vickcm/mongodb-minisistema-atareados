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
  return services
    .loginAccount(req.body)

    .then(async (account) => {
      console.log(account); // Agrega este console.log
      return { token: await tokenServices.createToken(account), account };
    })
    .then((responseAccount) => {
      console.log("Login Account Response:", responseAccount); // Agrega este console.log
      res
        .status(200)
        .send({ message: "Login realizado con éxito ", data: responseAccount });
    })
    .catch((error) => {
      console.log("Login Account Error:", error); // Agrega este console.log
      res.status(400).json({ error: { message: err.message } });
    });
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
