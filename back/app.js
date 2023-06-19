import express from "express";
import AccountsRouteApi from "./api/routes/accounts.api.routes.js";
import ProfilesRouteApi from "./api/routes/profiles.api.routes.js";
import ChallengesRouteApi from "./api/routes/challenges.api.routes.js";

import cors from 'cors'

const app = express(); // el server
app.use(cors())


app.use(express.urlencoded({ extended: true })); // para leer los datos del body
app.use(express.json()); // para leer los datos del body

app.use('/api', AccountsRouteApi); // para usar las rutas de la api accounts
app.use('/api', ProfilesRouteApi); // para usar las rutas de la api profiles
app.use('/api', ChallengesRouteApi); // para usar las rutas de la api challenges y tasks


app.listen(2023, function () {
  // levantar el servidor
  console.log("Servidor levantado! http://localhost:2023");
});
