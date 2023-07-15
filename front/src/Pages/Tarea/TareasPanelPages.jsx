import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { Container, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {
  useDesafio,
  useTareas,
  useUpdateTareas,
  useSetDesafio,
  SetDesafioContext,
} from "../../context/desafioContext";
import TareaListItem from "../../components/TareaItemListComponente";
import desafioService from "../../service/desafio.service";
import { formatDeadline } from "../../utils/utils";
import "../../css/Tarea.css";

function TareasPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPoints, setShowPoints] = useState(false);
  const tareas = useTareas();
  const updateTareas = useUpdateTareas();
  const setDesafio = useContext(SetDesafioContext);

  const { idDesafio } = useParams();
  const { desafio, desafioVersion } = useDesafio(); // Utilizar el desafío y la versión del contexto



  useEffect(() => {
    setIsLoading(true);
    desafioService
      .getTasks(idDesafio)
      .then((tareas) => {
        updateTareas(tareas);
        setIsLoading(false);
        // Actualizar los puntos de los miembros
        desafioService
          .getChallengeById(idDesafio)
          .then((fetchedDesafio) => {
            const updatedDesafio = { ...fetchedDesafio };
            setDesafio(updatedDesafio);
            console.log("Desafío actualizado:", updatedDesafio);
          })
          .catch((error) => {
            console.log("Error al obtener el desafío actualizado:", error);
          });
      })
      .catch((error) => {
        console.error("Error al cargar las tareas:", error);
        setIsLoading(false);
      });
  }, [idDesafio, desafioVersion, updateTareas]);

  const formattedDeadline = useMemo(
    () => formatDeadline(desafio?.deadline),
    [desafio?.deadline]
  );

  return (
    <>
      <Container>
        <div className="titulo">
          <h1>Desafío: {desafio?.title}</h1>
          <p>Fecha del vencimiento: {formattedDeadline}</p>
          <h2>Lista de Tareas</h2>
          <Link
            to={`/desafio/${idDesafio}/tareas/nueva`}
            className="btn-tareas"
          >
            Crear Tareas
          </Link>
        </div>
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        ) : (
          <>
            {tareas.length === 0 ? (
              <p className="p-none-tarea">No hay tareas disponibles.</p>
            ) : (
              <div>
                <div className="div-btn-pts">
                <Link variant="primary"
                  to={`/desafio/${idDesafio}/tablapuntos`}
                  className="link-tabla-puntos"
                >
                  Ver Tabla de Puntos
                </Link>
                </div>
                <div className="tareas-list-cards">
                  {tareas.map((tarea) => (
                    <TareaListItem key={tarea._id} tarea={tarea} />
                  ))}
                </div>
               
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default TareasPanel;
