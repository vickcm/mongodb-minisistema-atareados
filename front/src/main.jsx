import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Desafio from "./Desafio/FormDesafio";
import Recompensa from "./Recompensas/RecompensasUsuarios";
import Error404 from "./Pages/Error404";
import LoginPage from "./Pages/LoginPage";
import RoutePrivate from "./components/RoutePrivate";
import HomePages from "./Home/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/mainCss.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoutePrivate><App /></RoutePrivate>,
    errorElement: <Error404 />,
    children: [
      { path: "/desafio", element: <Desafio /> },
      { path: "recompensa", element: <Recompensa /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/", element: <HomePages /> },
  

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
