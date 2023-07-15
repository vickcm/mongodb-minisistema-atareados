import React, { useState, useMemo, useCallback } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import ImageCheck from "../imagenes/check.png";
import "../css/TareaPanelComponente.css";
import { Link } from "react-router-dom";
import { useDesafio, useSetDesafio, useUpdateTareas } from "../context/desafioContext";
import taskService from "../service/desafio.service";

function TareaListItem({ tarea }) {
  const desafio = useDesafio();
  const setDesafio = useSetDesafio();
  const setTareas = useUpdateTareas();

  const [isComplete, setIsComplete] = useState(tarea.isComplete);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const idTarea = tarea._id;
  const idDesafio = desafio._id;
  console.log("idTarea:", idTarea);
  console.log("idDesafio:", idDesafio);

  const handleComplete = useCallback(() => {
    if (!isComplete) {
      setIsButtonDisabled(true);

      const tareaActualizada = {
        isComplete: true,
        responsible: tarea.responsible,
        points: tarea.points,
        // Agrega cualquier otro dato necesario para la actualización de la tarea
      };

      taskService
        .updateTask(idDesafio, idTarea, tareaActualizada)
        .then(() => {
          console.log("Tarea actualizada");
          setIsComplete(true);
          // Aquí puedes realizar acciones adicionales después de completar la tarea

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

  const completeButtonVariant = useMemo(() => {
    return isComplete ? "secondary" : "primary";
  }, [isComplete]);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title className={`title-card ${isComplete ? "complete" : ""}`}>
          {tarea.title}
        </Card.Title>
        <Card.Text>Descripción: {tarea.description}</Card.Text>
        <p>Responsable: {tarea.responsible}</p>
        <p>Puntos: {tarea.points}</p>
        {isComplete ? (
          <>
            <Link
              variant={completeButtonVariant}
              disabled={isButtonDisabled}
              onClick={handleComplete}
              className="btn-tareas-completar"
            >
              Quitar Finalizado
            </Link>
            <span className="tarea-completada">
              Tarea Completa <Image src={ImageCheck} />
            </span>
          </>
        ) : (

          <div>
             <Link to={`/desafio/${desafio._id}/tareas/${tarea._id}/editar`} className="btn-tareas-editar"> Editar </Link>
             <Link
            variant={completeButtonVariant}
            disabled={isButtonDisabled}
            onClick={handleComplete}
            className="btn-tareas-completar"
          >
            Finalizar
          </Link>
          </div>
      
        )}
      </Card.Body>
    </Card>
  );
}

export default TareaListItem;
