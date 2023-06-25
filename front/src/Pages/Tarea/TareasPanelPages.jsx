import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Container, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDesafio } from "../../context/desafioContext";
import TareaListItem from "../../components/TareaItemListComponente";
import desafioService from "../../service/desafio.service";
import { formatDeadline } from "../../utils/utils";
import "../../css/Tarea.css";
import TablaPuntos from "../../components/TablaPuntosComponente";

function TareasPanel() {
  const [tareas, setTareas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPoints, setShowPoints] = useState(false);

  const desafio = useDesafio();
  const id = desafio._id;

  const handleTogglePoints = useCallback(() => {
    setShowPoints((prevShowPoints) => !prevShowPoints);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    desafioService
      .getTasks(id)
      .then((tareas) => {
        setTareas(tareas);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar las tareas:", error);
        setIsLoading(false);
      });
  }, [id]);

  const formattedDeadline = useMemo(() => formatDeadline(desafio.deadline), [desafio.deadline]);

  return (
    <>
      <Container>
        <div className="titulo">
          <h1>Desafío: {desafio.title}</h1>
          <p>Fecha del vencimiento: {formattedDeadline}</p>
          <h2>Lista de Tareas</h2>
          <Link to={`/desafio/${desafio._id}/tareas/nueva`} className="btn-tareas">Crear Tareas</Link>
        </div>
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        ) : (
          <>
            {tareas.length === 0 ? (
              <>
                <p className="p-none-tarea">No hay tareas disponibles.</p>
              </>
            ) : (
              <div>
                <div className="div-btn-pts">
                  <Link variant="primary"onClick={handleTogglePoints}>
                    {showPoints ? "Ocultar Puntos" : "Mostrar Puntos"}
                  </Link>
                </div>
                <div className="tareas-list-cards">
                  {tareas.map((tarea) => (
                    <TareaListItem key={tarea._id} tarea={tarea} />
                  ))}
                </div>
                {showPoints && <TablaPuntos />}
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default TareasPanel;
