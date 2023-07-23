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


async function sendResetPasswordEmail(req, res) {

  const email = req.body.email;
  return services
    .sendResetPasswordEmail(email)
    .then((response) => {
      res.status(200).send({ message: "Email enviado con éxito", data: response });
    })
    .catch((error) => {
      res.status(400).json({ error: { message: error.message } });
    });
}


async function resetPassword (req, res) {
  // recibo por parámetro un token y llamo al servicio para generar un nueva contraseña
  const token = req.body.token;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword; 
  console.log("token:", token, newPassword, confirmPassword)
  return services
    .resetPassword(token, newPassword, confirmPassword )
    .then((response) => {
      res.status(200).send({ message: "Contraseña actualizada con éxito", data: response });
    })
    .catch((error) => {
      res.status(400).json({ error: { message: error.message } });
      console.log("error:", error)
    });


}


export { createAccount, loginAccount, logoutAccount, sendResetPasswordEmail, resetPassword };
