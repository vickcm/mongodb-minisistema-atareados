import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Error404 from "./Pages/Error404";
import LoginPage from "./Pages/Perfil/LoginPage";
import RoutePrivate from "./Components/RoutePrivate";
import DesafioPage from "./Pages/Desafio/CrearDesafioPages";
import HomePages from "./Pages/HomePage";
import TareasPanelPages from "./Pages/Tarea/TareasPanelPages"
import PanelDesafio from "./Pages/Desafio/DesafioPanelPages"
import CreatePerfilPage from "./Pages/Perfil/CreatePerfilPage";
import RegisterPage from "./Pages/Perfil/RegisterPage";
import PerfilPage from "./Pages/Perfil/PerfilPage";
import CrearTareasPages from "./Pages/Tarea/CrearTareaPages";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/mainCss.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoutePrivate><App /></RoutePrivate>,
    errorElement: <Error404 />,
    children: [
      { path: "desafio", element: <DesafioPage /> },
      { path: "desafio/:idDesafio/creartareas", element: <CrearTareasPages /> },
      { path: "desafio/:idDesafio", element: <TareasPanelPages /> },
      { path: "paneldesafio", element: <PanelDesafio /> },
      { path: "crearperfil", element: <CreatePerfilPage /> },
      { path: "perfil", element: <PerfilPage /> },

      { path: "/", element: <HomePages /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);