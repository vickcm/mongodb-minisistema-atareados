import React, { useState, useMemo, useCallback } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import ImageCheck from "../imagenes/check.png";
import "../css/TareaPanelComponente.css";
import { Link } from "react-router-dom";
import { useDesafio, useSetDesafio, useUpdateTareas } from "../context/desafioContext";
import taskService from "../service/desafio.service";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function TareaListItem({ tarea }) {
 
  const {desafio} = useDesafio();
  const {setDesafio} = useSetDesafio();
  const setTareas = useUpdateTareas();
  const [isListed, setIsListed] = useState(true); // Estado para controlar si la tarea debe ser lista o no



  const [isComplete, setIsComplete] = useState(tarea.isComplete);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const idTarea = tarea._id;
  const idDesafio = localStorage.getItem("idDesafio");
  console.log("idTarea:", idTarea);
  console.log("idDesafio:", idDesafio);
 
  const handleComplete = useCallback(() => {

    console.log("idTarea:", idTarea);
    console.log("idDesafio:", idDesafio);
    if (!isComplete) {
      setIsButtonDisabled(true);

      const tareaActualizada = {
        isComplete: true,
        responsible: tarea.responsible,
        points: tarea.points,
        isDeleted: false,
        // Agrega cualquier otro dato necesario para la actualización de la tarea
      };

      taskService
        .updateTask(idDesafio, idTarea, tareaActualizada)
        .then(() => {
          console.log("Tarea actualizada");
          setIsComplete(true);
          console.log("tareaActualizada:", tareaActualizada);
          // Aquí puedes realizar acciones adicionales después de completar la tarea
          
          toast.success( tarea.title + " ha sido completada " + " [ "  + tarea.responsible + "] " + "suma " + tarea.points + " puntos");
          
          // Actualizar el estado del contexto desafio
          const updatedDesafio = { ...desafio };
          const updatedTasks = updatedDesafio.tasks.map((task) => {
            if (task._id === idTarea) {
              return { ...task, isComplete: true };
            }
            return task;
          });
          updatedDesafio.tasks = updatedTasks;
          setDesafio(updatedDesafio);
          
          console.log("Desafío actualizado:", updatedDesafio);
        })
        .catch((error) => {
          console.log("Error al actualizar la tarea:", error);
          // Maneja el error de actualización de la tarea si es necesario
          setIsButtonDisabled(false); // Habilita el botón en caso de error
        });
    } else {
      // Si la tarea ya está completada, realizar la acción de descompletar aquí
      setIsButtonDisabled(true);

      const tareaActualizada = {
        isComplete: false,
        responsible: tarea.responsible,
        points: tarea.points,
        isComplete: false,
        // Agrega cualquier otro dato necesario para la actualización de la tarea
      };

      taskService
        .updateTask(idDesafio, idTarea, tareaActualizada)
        .then(() => {
          console.log("Tarea descompletada");
          setIsComplete(false);
          // Aquí puedes realizar acciones adicionales después de descompletar la tarea

          // Actualizar el estado del contexto desafio
          const updatedDesafio = { ...desafio };
          const updatedTasks = updatedDesafio.tasks.map((task) => {
            if (task._id === idTarea) {
              return { ...task, isComplete: false };
            }
            return task;
          });
          updatedDesafio.tasks = updatedTasks;
          setDesafio(updatedDesafio);
          console.log("Desafío actualizado:", updatedDesafio);
        })
        .catch((error) => {
          console.log("Error al descompletar la tarea:", error);
          // Maneja el error de descompletar la tarea si es necesario
          setIsButtonDisabled(false); // Habilita el botón en caso de error
        });
    }
  }, [isComplete, tarea, idDesafio, idTarea, desafio, setDesafio]);

  const handleDelete = useCallback(() => {
    // Actualizar la tarea para que no se liste más
    taskService
      .updateTask(idDesafio, idTarea, { isDeleted: true }) // Enviar isDeleted al servidor
      .then(() => {
        console.log("Tarea borrada");
        setIsListed(false); // Actualizar el estado local para que la tarea no se muestre en la lista
        // Aquí puedes realizar acciones adicionales después de borrar la tarea
        toast.error( tarea.title + " ha sido borrada con éxito"  );
      })
      .catch((error) => {
        console.log("Error al borrar la tarea:", error);
        // Maneja el error de borrar la tarea si es necesario
      });
  }, [idDesafio, idTarea]);

  const completeButtonVariant = useMemo(() => {
    return isComplete ? "secondary" : "primary";
  }, [isComplete]);

  return isListed ? (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title className={`title-card ${isComplete ? "complete" : ""}`}>
          {tarea.title}
        </Card.Title>
        <Card.Text>Descripción: {tarea.description}</Card.Text>
        <p>Responsable: {tarea.responsible}</p>
        <p>Puntos: {tarea.points}</p>
        {isComplete ? (
          <div className="d-flex flex-column align-items-start">
            <span className="tarea-completada">
              Tarea Completa <Image src={ImageCheck} />
            </span>
            <Link
              variant={completeButtonVariant}
              disabled={isButtonDisabled}
              onClick={handleComplete}
              className="btn-tareas-descompletar"
            >
              Quitar Completado
            </Link>
          </div>
        ) : (
          <div className="d-flex flex-column align-items-start">
            <Link
              variant={completeButtonVariant}
              disabled={isButtonDisabled}
              onClick={handleComplete}
              className="btn-tareas-completar"
            >
              Tarea Completada
            </Link>
            <Link to={`/desafio/${idDesafio}/tareas/${idTarea}/editar`} className="btn-tareas-editar">
              Editar
            </Link>
            <button onClick={handleDelete} className="btn-tareas-borrar">
              Borrar
            </button>
          </div>
        )}
      </Card.Body>
      <div></div>
    </Card>
  ) : null; // Si isListed es falso, no se muestra la tarjeta en la lista
}

export default TareaListItem;
