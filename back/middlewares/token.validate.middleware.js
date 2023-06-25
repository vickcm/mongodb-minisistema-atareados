import * as tokenService from "../services/token.services.js";

async function validateToken(req, res, next) {
  const token = req.headers["auth-token"];
  if (!token) {
    return res
      .status(401)
      .json({ error: { message: "No se ha enviado el token" } });
  }

  const account = await tokenService.verifiedToken(token);

  if (!account) {
    return res.status(401).json({ error: { message: "Token inválido" } });
  }

  req.account = account;
  next();
}

export { validateToken };
