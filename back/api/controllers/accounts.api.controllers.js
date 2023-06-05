import * as services from "../../services/accounts.services.js";

async function createAccount(req, res) {
    console.log(req.body);
  return services.createAccount(req.body)
    .then((response) => {

        console.log('Create Account Response:', response); // Agrega este console.log
        res.status(200).send({message: "Cuenta creada exitosamente", data: response});
    })
    .catch((error) => {
        console.log('Create Account Error:', error); // Agrega este console.log
      res.status(400).json({ error: { message: err.message } });
    });
}

async function loginAccount(req, res) {
    return services.loginAccount(req.body)
    .then((response) => {
        console.log('Login Account Response:', response); // Agrega este console.log
        res.status(200).send({message: "Login exitoso", data: response});
    })
    .catch((error) => {
        console.log('Login Account Error:', error); // Agrega este console.log
        res.status(400).json({ error: { message: err.message } });
    });
}



export { createAccount, loginAccount };
