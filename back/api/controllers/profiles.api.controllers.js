import * as profileService from "../../services/profiles.services.js";

async function createProfile(req, res) {
  console.log("Create Profile Request:", req.body); // Agrega este console.log
  console.log("Create Profile Account:", req.account); // Agrega este console.log
  return profileService
    .createProfile(req.body, req.account)
    .then(() => {
      res.status(201).json({ message: "Perfil creado exitosamente." });
    })
    .catch((err) => {
      res.status(400).json({ error: { message: err.message } });
    });
}

async function getProfiles(req, res) {
  return profileService
    .getProfiles(req.account._id)

    .then((profiles) => {
      res.status(200).json(profiles);
    })
    .catch((err) => {
      res.status(400).json({ error: { message: err.message } });
    });
}

export { createProfile, getProfiles };
