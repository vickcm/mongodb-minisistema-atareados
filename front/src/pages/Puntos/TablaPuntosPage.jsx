import React, { useEffect, useState } from "react";
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
  const [desafio, setDesafio] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    desafioService
      .getChallengeById(idDesafio)
      .then((fetchedDesafio) => {
        // Actualizar el desafío si es necesario
        // ...
        // guardar el desafío en una constante
        console.log("fetchedDesafio", fetchedDesafio);
        setDesafio(fetchedDesafio);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error al obtener el desafío:", error);
        setIsLoading(false);
      });
  }, [idDesafio]);

  return (
    <Container>
      <div className="titulo mb-4">
        <h1> {desafio?.title}</h1>
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
