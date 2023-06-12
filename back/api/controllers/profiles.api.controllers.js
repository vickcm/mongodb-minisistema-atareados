import * as services from "../../services/profiles.services.js";

async function createProfile(req, res) {
  try {

    const userId = req.userId; // Obtén el userId del usuario autenticado desde el middleware de validación del token
    console.log(userId) // Obtén el userId del usuario autenticado desde el payload del token

    await services.createProfile(req.body, userId);

    res.status(200).send({ message: "Perfil creado con éxito" });
  } catch (error) {
    console.log("Create Profile Error:", error);
    res.status(500).json({ error: { message: "Error en el servidor" } });
  }
}


export { createProfile };
