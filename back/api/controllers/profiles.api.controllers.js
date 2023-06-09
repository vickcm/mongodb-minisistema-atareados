import * as services from "../../services/profiles.services.js";

async function createProfile(req, res) {
  console.log(req.body);
  return services
    .createProfile(req.body)
    .then((response) => {
      console.log("Create Profile Response:", response); // Agrega este console.log
      res
        .status(200)
        .send({ message: "Perfil creado exitosamente", data: response });
    })
    .catch((error) => {
      console.log("Create Profile Error:", error); // Agrega este console.log
      res.status(400).json({ error: { message: error.message } });
    });
}

export { createProfile };
