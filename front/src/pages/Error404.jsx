import React from "react";
import "../css/Error404Estilos.css";
import { Link } from "react-router-dom";
import ImageHome from "../imagenes/Home.png";
import Image from "react-bootstrap/Image";

function Error404() {
  return (
    <div className="Error404">
      <div className="img-home">
        <Image src={ImageHome} className="image" />
      </div>
      <h1>404</h1>
      <p>Página no encontrada</p>

      <Link to="/" className="btn-home">
        Volver al inicio
      </Link>
    </div>
  );
}

export default Error404;
