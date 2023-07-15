import React, { useEffect, useState, useMemo, useContext } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { useDesafio } from "../../context/desafioContext";
import desafioService from "../../service/desafio.service";
import { formatDeadline } from "../../utils/utils";
import "../../css/Tarea.css";
import TablaPuntos from "../../components/TablaPuntosComponente";

function TablaPuntosPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { idDesafio } = useParams();
  const { desafio } = useDesafio();

  useEffect(() => {
    setIsLoading(true);
    desafioService
      .getChallengeById(idDesafio)
      .then((fetchedDesafio) => {
        // Actualizar el desafío si es necesario
        // ...
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error al obtener el desafío:", error);
        setIsLoading(false);
      });
  }, [idDesafio]);

  const formattedDeadline = useMemo(
    () => formatDeadline(desafio?.deadline),
    [desafio?.deadline]
  );

  return (
    <Container>
      <div className="titulo">
        <h1>Desafío: {desafio?.title}</h1>
        <p>Fecha del vencimiento: {formattedDeadline}</p>
        <h2>Tabla de Puntos</h2>
        <Link to={`/desafio/${idDesafio}`} className="btn-tareas">
          Volver a Tareas
        </Link>
      </div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      ) : (
        <>
          <TablaPuntos></TablaPuntos>
        </>
      )}
    </Container>
  );
}

export default TablaPuntosPage;
