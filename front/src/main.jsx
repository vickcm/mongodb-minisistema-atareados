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
import TareasActionsPage from "./Pages/Tarea/TareasActionsPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/mainCss.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TablaPuntosPage from "./pages/Puntos/TablaPuntosPage";
import ResetPasswordPage from "./Pages/Perfil/ResetPasswordPage";
import ResetPasswordTokenPage from "./Pages/Perfil/ResetPasswordTokenPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RoutePrivate><App /></RoutePrivate>,
    errorElement: <Error404 />,
    children: [
      { path: "desafio", element: <DesafioPage /> },
      { path: "desafio/:idDesafio/tareas/nueva", element: <TareasActionsPage /> },
      { path: "desafio/:idDesafio/tareas/:idTarea/editar", element: <TareasActionsPage /> },

      { path: "desafio/:idDesafio", element: <TareasPanelPages /> },
      { path: "desafio/:idDesafio/tablapuntos", element: <TablaPuntosPage /> },

      { path: "paneldesafio", element: <PanelDesafio /> },
      { path: "crearperfil", element: <CreatePerfilPage /> },
      { path: "perfil", element: <PerfilPage /> },

      { path: "/", element: <HomePages /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/passwordreset", element: <ResetPasswordPage /> },
  { path: "/password/reset", element: <ResetPasswordTokenPage /> },



  { path: "/register", element: <RegisterPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);