import React, { useState, useEffect } from "react";
import { Button } from "bootstrap-4-react/lib/components";
import { Container } from "bootstrap-4-react/lib/components/layout";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../css/FormDesafioStyle.css";
import { useDesafio } from "../../context/desafioContext";
import TareaListItem from '../../components/TareaItemListComponente';
import desafioService from "../../service/desafio.service.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function TareasForm() {
  const params = useParams();
  const desafio = useDesafio(); // Obtén el desafío del contexto
  const navigate = useNavigate();
  const [tareas, setTareas] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [selectedMember, setSelectedMember] = useState(null); // Estado para almacenar el miembro seleccionado
  const [isLoading, setIsLoading] = useState(true); // Estado para indicar si se está cargando el desafío

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

    // Crear la tarea utilizando el servicio desafioService.createTask()
    const nuevaTarea = {
      title: title,
      description: description,
      points: points,
      responsible: selectedMember,
      // Asegúrate de agregar cualquier otro dato necesario para la creación de la tarea
    };

    const id = params.idDesafio;

    desafioService
      .createTask(id, nuevaTarea)
      .then((response) => {
        // La tarea se ha creado exitosamente
        console.log("Tarea creada:", response);
        // Obtener las tareas actualizadas después de crear la nueva tarea
        return desafioService.getTasks(id);
      })
      .then((tareas) => {
        // Actualizar el estado de las tareas con las tareas obtenidas
        setTareas(tareas);
        setTitle("");
        setDescription("");
        setPoints(0);
        setSelectedMember(null);
        navigate(`desafio/${id}`, { replace: true });
      })
      .catch((error) => {
        // Error al crear la tarea
        console.error("Error al crear la tarea:", error);
      });
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
    desafioService.getTasks(id)
      .then((tareas) => {
        setTareas(tareas);
      })
      .catch((error) => {
        console.error('Error al cargar las tareas:', error);
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
            <h1>{desafio?.title}</h1>
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
                value={selectedMember ? selectedMember._id : ""}
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
              Añadir tarea
            </Button>
          </div>
        </Form>
        <h3>Tareas Agregadas:</h3>
        <div className='tareas-list-cards'>
          {tareas.map((tarea) => (
            <TareaListItem key={tarea._id} tarea={tarea}/>
          ))}
        </div>
      </Container>
    </>
  );
}

export default TareasForm;
