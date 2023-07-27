import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { Container, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
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
import "../../css/Tarea.css";
import { BsCheckCircle, BsFillPencilFill } from "react-icons/bs";
import { toast } from "react-toastify";

function TareasPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [showPoints, setShowPoints] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Estado para alternar entre visualización y edición
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDeadline, setEditedDeadline] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");
  const [members, setMembers] = useState([]); // [{username: "user1", email: "user1@mail"}
  const tareas = useTareas();
  const updateTareas = useUpdateTareas();
  const setDesafio = useContext(SetDesafioContext);
  const { idDesafio } = useParams();

  // guardo el id del desafio en localStorage
  localStorage.setItem("idDesafio", idDesafio);

  const [fetchedDesafio, setFetchedDesafio] = useState({});
  const desafio = useDesafio();

  console.log("desafio:", desafio);

  useEffect(() => {
    if (!idDesafio) {
      // Si no hay idDesafio, obtener el idDesafio del localStorage
      const idDesafio = localStorage.getItem("idDesafio");
      console.log("idDesafio:", idDesafio);
    }

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
            setFetchedDesafio(updatedDesafio);
            setTitle(updatedDesafio.title);
            setDeadline(updatedDesafio.deadline);
            setMembers(updatedDesafio.members);
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
  }, [idDesafio, updateTareas]);

  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const formattedDeadline = formatDeadline(fetchedDesafio?.deadline) || "";
  const handleEdit = () => {
    // Al hacer clic en el botón de edición, activamos el modo de edición
    setIsEditing(true);
    // También guardamos los valores actuales del desafío en los estados de edición
    setEditedTitle(title); // Sincronizar con el título actual del desafío
    setEditedDeadline(deadline); // Sincroni
  };

  const handleSave = () => {
    // Al hacer clic en el botón de guardar, desactivamos el modo de edición y guardamos los cambios
    setIsEditing(false);
    // Actualizamos el desafío con los nuevos datos
    const updatedDesafio = {
      ...desafio.desafio,
      title: editedTitle,
      deadline: editedDeadline,
    };

    setDesafio(updatedDesafio);

    // Actualizamos el desafío en local storage
    localStorage.setItem("desafio", JSON.stringify(updatedDesafio));

    // llamar a la API para actualizar el desafío
    desafioService
      .updateChallenge(idDesafio, {
        title: editedTitle,
        deadline: editedDeadline,
      })
      .then((updatedDesafio) => {
        console.log("Desafío actualizado:", updatedDesafio);
        setTitle(updatedDesafio.title);
        setDeadline(updatedDesafio.deadline);

        toast.success("Desafío actualizado con éxito.");
      })
      .catch((error) => {
        console.log("Error al actualizar el desafío:", error);
      });
    // Aquí deberías realizar alguna lógica para guardar los datos editados, por ejemplo, utilizando desafioService para actualizar el desafío en la base de datos.
  };

 
  return (
    <>
      <Container>
        <div className="row desafio-contenedor mt-3">
          <div className="col-12 col-md-7 desafio-informacion">
            {isEditing ? (
              // Modo edición
              <>
                <h1>
                  <Form.Control
                    type="text"
                    value={editedTitle || title}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                </h1>
                <p>
                  Fecha del vencimiento:{" "}
                  <Form.Control
                    type="date"
                    value={editedDeadline || deadline}
                    onChange={(e) => setEditedDeadline(e.target.value)}
                  />
                </p>
                <button
                  onClick={handleSave}
                  className="btn-editar-desafio"
                  title="guardar desafio"
                >
                  <BsCheckCircle />
                </button>
              </>
            ) : (
              // Modo visualización
              <>
                <div className="d-flex justify-content-between">
                  <h1 className="me-3">{title || editedTitle} </h1>
                  <button
                    onClick={handleEdit}
                    className="btn-editar-desafio"
                    title="editar desafio"
                  >
                    <BsFillPencilFill />
                  </button>
                </div>

                <p>Fecha del vencimiento: {deadline || editedDeadline} </p>
                <p>{/* {message}  */}</p>
              </>
            )}
          </div>
          <div className="col-12 col-md-4">
            <p>Equipo:</p>
            <ul className="list-unstyled">
              {members.map((member) => (
                <li key={member._id}>
                  {member.username} - {member.email}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="d-flex title-tareas mt-5 justify-content-center">
          <h2 className="me-3">Lista de Tareas</h2>
          <Link
            to={`/desafio/${idDesafio}/tareas/nueva`}
            className="btn-tareas"
            title="Agregar tarea"
          >
            +
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
              <div className="container">
                <div className="div-btn-pts">
                  <Link
                    variant="primary"
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
