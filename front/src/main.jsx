import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Error404 from "./Pages/Error404";
import LoginPage from "./Pages/LoginPage";
import RoutePrivate from "./Components/RoutePrivate";
import DesafioPage from "./Pages/DesafioPages";
import HomePages from "./Pages/HomePage";

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
      { path: "/", element: <HomePages /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
