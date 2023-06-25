import React, { useEffect, useState } from "react";
import { formatDeadline } from "../../utils/utils";
import "../../css/Tarea.css";
import { useParams } from "react-router-dom";
import TareasFormActions from "../../components/TareasFormActions";
import desafioService from "../../service/desafio.service.js";

function TareasPanel() {
  // Obtén el valor de idTarea de los parámetros de la URL
  const params = useParams();
  console.log("params:", params);
  const idTarea = params.idTarea;
  const idDesafio = params.idDesafio;

  const [tarea, setTarea] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    console.log("idTarea: TAREASACTIONSPAGE LIN23", idTarea);

    if (idTarea) {
      console.log("idTarea: TAREASACTIONSPAGE LIN26", idTarea);

      // Si idTarea existe, cargar la tarea correspondiente
      desafioService
        .getTaskById(idDesafio, idTarea)
        .then((tarea) => {
          console.log("idTarea: TAREASACTIONSPAGE LIN32", idTarea);
          setTarea(tarea);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error al cargar las tareas:", error);
          setIsLoading(false);
        });
    } else {
      // Si idTarea es falsa, marcar isLoading como false
      setIsLoading(false);
    }
  }, [idTarea]);

  return (
    <>
      {idTarea ? (
        <TareasFormActions key={tarea._id} tarea={tarea}></TareasFormActions>
      ) : (
        <TareasFormActions>
          {/* Aquí puedes colocar el contenido que deseas mostrar cuando idTarea sea falsa */}
        </TareasFormActions>
      )}
    </>
  );
}

export default TareasPanel;
