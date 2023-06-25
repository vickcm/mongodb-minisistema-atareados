import * as services from "../../services/accounts.services.js";
import * as tokenServices from "../../services/token.services.js";

async function createAccount(req, res) {
  return services
    .createAccount(req.body)
    .then((response) => {
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

    const responseAccount = {
      token: await tokenServices.createToken(account),
      account
    };

    res.status(200).send({ message: "Login realizado con éxito", responseAccount });

  } catch (error) {
    res.status(400).json({ error: { message: error.message } })

    
  }
}


async function logoutAccount(req, res) {
  const token = req.headers["auth-token"];

  return tokenServices.deleteToken(token)
    .then(() => {
      res.status(200).send({ message: "Logout realizado con éxito " });
    })
    .catch((error) => {
      res.status(400).json({ error: { message: err.message } });
    });
}

export { createAccount, loginAccount, logoutAccount };
