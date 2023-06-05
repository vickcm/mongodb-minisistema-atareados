import express from "express";
import AccountsRouteApi from "./api/routes/accounts.api.routes.js";
import cors from 'cors'

const app = express(); // el server
app.use(cors())


app.use(express.urlencoded({ extended: true })); // para leer los datos del body
app.use(express.json()); // para leer los datos del body

app.use('/api', AccountsRouteApi); // para usar las rutas de la api accounts

app.listen(2023, function () {
  // levantar el servidor
  console.log("Servidor levantado! http://localhost:2023");
});
