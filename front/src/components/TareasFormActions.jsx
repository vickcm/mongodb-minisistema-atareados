import React, { useState, useEffect } from "react";
import { Button } from "bootstrap-4-react/lib/components";
import { Container } from "bootstrap-4-react/lib/components/layout";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../css/FormDesafioStyle.css";
import { useDesafio } from "../context/desafioContext";
import desafioService from "../service/desafio.service.js";
import { useParams, useNavigate } from "react-router-dom";

function TareasFormActions({ tarea }) {
  console.log("Tarea: LINEA43 TAREASFORMACTION", tarea);

  const params = useParams();
  const desafio = useDesafio(); // Obtén el desafío del contexto
  const navigate = useNavigate();
  const [title, setTitle] = useState(tarea ? tarea.title : "");
  const [description, setDescription] = useState(tarea ? tarea.description : "");
  const [points, setPoints] = useState(tarea ? tarea.points : 0);
  const [selectedMember, setSelectedMember] = useState(tarea ? tarea.responsible : null);

  // Estado para almacenar el miembro seleccionado
  const [isLoading, setIsLoading] = useState(true); // Estado para indicar si se está cargando el desafío
  const [submitButtonLabel, setSubmitButtonLabel] = useState(tarea ? "editar tarea" : "añadir tarea");

  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const onChangePoints = (event) => {
    setPoints(event.target.value);
  };

  const onSelectMember = (event) => {
    const memberId = event.target.value;
    const selectedMember = desafio.members.find((member) => member._id === memberId);
    setSelectedMember(selectedMember.username);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (tarea) {
      // Actualizar la tarea existente
      const tareaActualizada = {
        _id: tarea._id,
        title: title,
        description: description,
        points: points,
        responsible: selectedMember,
        // Agrega cualquier otro dato necesario para la actualización de la tarea
      };

      desafioService
        .updateTask(tarea._id, tareaActualizada)
        .then((response) => {
          // La tarea se ha actualizado exitosamente
          console.log("Tarea actualizada:", response);
          // Obtener las tareas actualizadas después de actualizar la tarea
          return desafioService.getTasks(params.idDesafio);
        })
        .then((tareas) => {
          // Actualizar el estado de las tareas con las tareas obtenidas
          setTitle("");
          setDescription("");
          setPoints(0);
          setSelectedMember(null);
          navigate(`/desafio/${params.idDesafio}`, { replace: true });
        })
        .catch((error) => {
          // Error al actualizar la tarea
          console.error("Error al actualizar la tarea:", error);
        });
    } else {
      // Crear una nueva tarea
      const nuevaTarea = {
        title: title,
        description: description,
        points: points,
        responsible: selectedMember,
        // Agrega cualquier otro dato necesario para la creación de la tarea
      };

      desafioService
        .createTask(params.idDesafio, nuevaTarea)
        .then((response) => {
          // La tarea se ha creado exitosamente
          console.log("Tarea creada:", response);
          // Obtener las tareas actualizadas después de crear la nueva tarea
          return desafioService.getTasks(params.idDesafio);
        })
        .then((tareas) => {
          // Actualizar el estado de las tareas con las tareas obtenidas
          setTitle("");
          setDescription("");
          setPoints(0);
          setSelectedMember(null);
          navigate(`/desafio/${params.idDesafio}`, { replace: true });
        })
        .catch((error) => {
          // Error al crear la tarea
          console.error("Error al crear la tarea:", error);
        });
    }
  };

  useEffect(() => {
    // Verificar si el desafío está cargado
    if (desafio) {
      setIsLoading(false); // El desafío ha sido cargado, establecer isLoading a false
    }
  }, [desafio]);

  useEffect(() => {
    // Obtener las tareas cuando el componente se monte
    const id = params.idDesafio;
    desafioService
      .getTasks(id)
      .then((response) => {
        console.log("Tarea creada:", response);
      })
      .catch((error) => {
        console.error("Error al cargar las tareas:", error);
      });
  }, [params.idDesafio]);

  if (isLoading) {
    return <div>Cargando desafío...</div>; // Muestra un mensaje de carga mientras se carga el desafío
  }

  return (
    <>
      <Container className="container-desafio">
        <Form className="form-desafio" onSubmit={onSubmit}>
          <div className="titulo">
          <h1>{tarea ? tarea.title : "Añadir Tarea"}</h1>
            <p>Carga las tareas que consideres necesarias</p>
          </div>
          <Row className="mb-3 rowDesafio">
            <Form.Group as={Col} md="4" controlId="titulo">
              <Form.Label>Título de la tarea</Form.Label>
              <Form.Control type="titulo" value={title} onChange={onChangeTitle} />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="descripcion">
              <Form.Label>Describe la tarea</Form.Label>
              <Form.Control type="descripcion" value={description} onChange={onChangeDescription} />
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="puntos">
              <Form.Label>Asigna los puntos</Form.Label>
              <Form.Control type="puntos" value={points} onChange={onChangePoints} />
            </Form.Group>
            {desafio && desafio.members && (
              <Form.Select
                aria-label="Default select example"
                className="form-select"
                value={selectedMember ? selectedMember.username : ""}
                onChange={onSelectMember}
              >
                <option>Selecciona el usuario</option>
                {desafio.members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.username}
                  </option>
                ))}
              </Form.Select>
            )}
          </Row>
          <div className="aling-button-desafio">
            <Button className="btn-desfio" type="submit">
              {submitButtonLabel}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default TareasFormActions;
