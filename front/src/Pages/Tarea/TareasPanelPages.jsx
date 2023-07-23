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
import { formatDeadline, formatDateForInput } from "../../utils/utils";
import "../../css/Tarea.css";
import { FaEdit, FaSave } from "react-icons/fa"; // Importamos los iconos de edición y guardar


function TareasPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPoints, setShowPoints] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Estado para alternar entre visualización y edición
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDeadline, setEditedDeadline] = useState("");

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

  const handleEdit = () => {
    // Al hacer clic en el botón de edición, activamos el modo de edición
    setIsEditing(true);
    // También guardamos los valores actuales del desafío en los estados de edición
    setEditedTitle(desafio?.title || "");
    setEditedDeadline(desafio?.deadline || "");
  };

  const handleSave = () => {
    // Al hacer clic en el botón de guardar, desactivamos el modo de edición y guardamos los cambios
    setIsEditing(false);
    // Actualizamos el desafío con los nuevos datos
    setDesafio({
      ...desafio,
      title: editedTitle,
      deadline: editedDeadline,
    });

    // llamar a la API para actualizar el desafío
    desafioService
      .updateChallenge(idDesafio, {
        title: editedTitle,
        deadline: editedDeadline,
      })
      .then((updatedDesafio) => {
        console.log("Desafío actualizado:", updatedDesafio);
      })
      .catch((error) => {
        console.log("Error al actualizar el desafío:", error);
      });


    // Aquí deberías realizar alguna lógica para guardar los datos editados, por ejemplo, utilizando desafioService para actualizar el desafío en la base de datos.
  };

  return (
    <>
    <Container>
        <div className="titulo">
          {isEditing ? (
            // Modo edición
            <>
              <h1>
                Desafío:{" "}
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <button onClick={handleSave}>
                  <FaSave />
                </button>
              </h1>
              <p>
                Fecha del vencimiento:{" "}
                <input
                  type="date"
                  value={editedDeadline}
                  onChange={(e) => setEditedDeadline(e.target.value)}
                />
                <button onClick={handleSave}>
                  <FaSave />
                </button>
              </p>
            </>
          ) : (
            // Modo visualización
            <>
              <h1>
                Desafío: {desafio?.title}{" "}
                <button onClick={handleEdit}>
                  <FaEdit />
                </button>
              </h1>
              <p>
                Fecha del vencimiento: {formattedDeadline}{" "}
                <button onClick={handleEdit}>
                  <FaEdit />
                </button>
              </p>
            </>
          )}
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
